const crypto = require("node:crypto");
const fs = require('node:fs');
const {pipeline} = require("node:stream");

/*
* First 16 bytes: Salt
* Second 16 bytes: IV
* Ciphertext
* Last 16 bytes: MAC
*/

const password = process.env.FE_PASSWORD || "nonSecurePassword";

const algorithm = "aes-256-gcm";

const fd = fs.openSync("./data.enc", "r");
const filesize = fs.fstatSync(fd).size;

const salt = Buffer.alloc(16);
const iv = Buffer.alloc(12);
const authcode = Buffer.alloc(16);

fs.readSync(fd, salt, 0, 16, 0);
fs.readSync(fd, iv, 0, 12, 16);
fs.readSync(fd, authcode, 0, 16, filesize - 16);

console.log("Salt: ", salt.toString('hex'));
console.log("IV: ", iv.toString('hex'));
console.log("MAC: ", authcode.toString('hex'));

crypto.pbkdf2(password, salt, 1_000_000, 32, "sha512", (err, key) => {
  if(err) console.error(err);

  const cipher = crypto.createDecipheriv(algorithm, key, iv);

  // Set the MAC for verification
  cipher.setAuthTag(authcode);

  const input = fs.createReadStream('./data.enc', {
    start: 28, // excluding the salt and IV
    end: filesize - (16 + 1) // excluding MAC
  });
  const plaintext = fs.createWriteStream("data_decrypted.txt");

  pipeline(input, cipher, plaintext, (err) => {
    if(err) console.error(err);

    console.log("Decryption completed and authentication tag verified");
  })
})
