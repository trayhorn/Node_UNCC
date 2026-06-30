const fs = require("node:fs");
const crypto = require("node:crypto");
const { pipeline } = require("node:stream");

/*
* First 16 bytes: Salt
* Second 16 bytes: IV
* Ciphertext
* Last 16 bytes: MAC
*/

// Master Password. Usig a Key Management System (KMS) is way more secure than environment variables.
// WARNING: Do not hardcode fallback passswords in real-world applications like we are doing here with "nonSecurePassword"
const password = process.env.FE_PASSWORD || "nonSecurePassword";

const algorithm = "aes-256-gcm";

const salt = crypto.randomBytes(16); // salt for key derivation function
const iv = crypto.randomBytes(12); // recommended to be 96 bits exactly

console.log("Salt: ", salt.toString("hex"));
console.log("IV: ", iv.toString('hex'));

crypto.pbkdf2(password, salt, 1_000_000, 32, "sha512", (err, derivedKey) => {
  if (err) console.error(err);

  const cipher = crypto.createCipheriv(algorithm, derivedKey, iv);

  const plaintext = fs.createReadStream('./data.txt');
  const output = fs.createWriteStream('./data.enc'); // salt + iv + ciphertext + mac

  output.write(salt);
  output.write(iv);

  pipeline(plaintext, cipher, output, (err) => {
    if(err) return console.error(err);
    // MAC
    const authCode = cipher.getAuthTag(); // get the message authentication code
    console.log("MAC: ", authCode.toString("hex"));
    fs.appendFileSync("./data.enc", authCode);
    console.log('Encryption completed and authentication tag written.')
  })
});

// KEY
// MAC
