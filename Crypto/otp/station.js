const fs = require("node:fs");

const key = fs.readFileSync("./key");

function decrypt(cipherText) {
  const plainText = Buffer.alloc(cipherText.length);

  for (let i = 0; i < plainText.length; i++) {
    plainText[i] = cipherText[i] ^ key[i];
    key[i] = 0;
  }

  return plainText;
}

const msg1 = Buffer.from(
  "e6ef20124cb5fc9ff801ac65f84026ba541449a620ac79320e63cea50374e219903223030aa354",
  "hex",
);

const plainText = decrypt(msg1);
console.log(plainText.toString("utf-8"));
