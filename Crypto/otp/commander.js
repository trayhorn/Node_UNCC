const fs = require('node:fs');

const key = fs.readFileSync('./key');
let keyOffset = 0;

function encrypt(plainText) {
  if(keyOffset + plainText.length > key.length) {
    console.error('Key length is not enough to encrypt this message.')
  }

  const cipherText = Buffer.alloc(plainText.length);

  for (let i = 0; i < plainText.length; i++) {
    cipherText[i] = plainText[i] ^ key[keyOffset + i];
    key[keyOffset + i] = 0;
  }

  keyOffset = keyOffset + plainText.length;

  return cipherText;
}

const msg1 = Buffer.from('Commander Hendrick: Stand by to launch.');

const msg1Ecnrypted = encrypt(msg1);
console.log(msg1Ecnrypted);