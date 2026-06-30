const crypto = require("node:crypto");

const password = "my_password";
const salt = crypto.randomBytes(32);
const iterations = 100000;
const keyLength = 32; // 256 bits of data
const digest = "sha512";


// Under the hood hmac is being called
crypto.pbkdf2(
  password,
  salt,
  iterations,
  keyLength,
  digest,
  (err, derivedKey) => {
    if (err) console.error(err);
    console.log("Derived key: ", derivedKey.toString("hex"));

    // Now use the key to do AES-256 ecnryption
    // Save the derivedKey + salt to our DB, for password hashing
  }
);
