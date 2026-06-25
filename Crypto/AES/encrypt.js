const crypto = require('node:crypto');
const fs = require('node:fs');
const {pipeline} = require('node:stream');

// ECB MODE - SIMPLE ENCRYPTION

/*

const key = Buffer.from("0123456789abcdef", "utf-8") // 128-bit
// const key = crypto.randomBytes(16) // This is how the key should be generated

const plaintext = Buffer.from("2", "utf-8");

const cipher = crypto.createCipheriv("aes-128-ecb", key, null);

const cipherChunk1 = cipher.update(plaintext);
const cipherChunk2 = cipher.final();

const ciphertext = Buffer.concat([cipherChunk1, cipherChunk2]);

console.log("Ciphertext is: ", ciphertext);

*/

// const key = Buffer.from("0123456789abcdef", "utf-8") // 128-bit
// // const key = crypto.randomBytes(16) // This is how the key should be generated

// const cipher = crypto.createCipheriv("aes-128-ecb", key, null);

// const plaintext = fs.createReadStream("./plaintext.txt");
// const ciphertext = fs.createWriteStream('./ciphertext.enc');

// pipeline(plaintext, cipher, ciphertext, (err) => {
//   if(err) return console.error("Pipeline failed: ", err);
//   console.log("Encryption completed");
// })

// ECB MODE DECRYPTION

// const key = Buffer.from("0123456789abcdef", "utf-8") // 128-bit
// // const key = crypto.randomBytes(16) // This is how the key should be generated

// const cipher = crypto.createCipheriv("aes-128-ecb", key, null);

// const ciphertext = fs.createReadStream('./ciphertext.enc');
// const plaintext = fs.createWriteStream("./plaintext-decrypted.txt");

// pipeline(ciphertext, cipher, plaintext, (err) => {
//   if(err) return console.error("Pipeline failed: ", err);
//   console.log("Decryption completed");
// })

//CBC MODE - ENCRYPTION

// const key = Buffer.from("0123456789abcdef", "utf-8") // 128-bit
// // const key = crypto.randomBytes(16) // This is how the key should be generated

// const iv = Buffer.from("123456789abcdef", "utf-8"); // 128 bits, a horrible way 
// // const iv = crypto.randomBytes(16);

// const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);

// const plaintext = fs.createReadStream('./plaintext.txt');
// const ciphertext= fs.createWriteStream('./ciphertext.enc');

// pipeline(plaintext, cipher, ciphertext, (err) => {
//   if(err) console.error('Decryption failed');
//   console.log("Decryption completed");
// })

//CBC MODE - DECRYPTION

// const key = Buffer.from("0123456789abcdef", "utf-8") // 128-bit
// // const key = crypto.randomBytes(16) // This is how the key should be generated

// const iv = Buffer.from("123456789abcdef", "utf-8"); // 128 bits, a horrible way 
// // const iv = crypto.randomBytes(16);

// const cipher = crypto.createDecipheriv("aes-128-cbc", key, iv);

// const ciphertext= fs.createReadStream('./ciphertext.enc');
// const plaintext = fs.createWriteStream('./plaintext.txt');

// pipeline(ciphertext, cipher, plaintext, (err) => {
//   if(err) console.error('Decryption failed');
//   console.log("Decryption completed");
// })

//CTR MODE - ENCRYPTION

// const key = Buffer.from("0123456789abcdef", "utf-8") // 128-bit
// // const key = crypto.randomBytes(16) // This is how the key should be generated

// const iv = Buffer.from("123456789abcdef", "utf-8"); // 128 bits, a horrible way 
// // const iv = crypto.randomBytes(16);

// const cipher = crypto.createCipheriv("aes-128-ctr", key, iv);

// const plaintext = fs.createReadStream('./plaintext.txt');
// const ciphertext= fs.createWriteStream('./ciphertext.enc');

// pipeline(plaintext, cipher, ciphertext, (err) => {
//   if(err) console.error('Decryption failed');
//   console.log("Decryption completed");
// })

//CBC MODE - DECRYPTION

// const key = Buffer.from("0123456789abcdef", "utf-8") // 128-bit
// // const key = crypto.randomBytes(16) // This is how the key should be generated

// const iv = Buffer.from("123456789abcdef", "utf-8"); // 128 bits, a horrible way 
// // const iv = crypto.randomBytes(16);

// const cipher = crypto.createDecipheriv("aes-128-ctr", key, iv);

// const ciphertext= fs.createReadStream('./ciphertext.enc');
// const plaintext = fs.createWriteStream('./plaintext.txt');

// pipeline(ciphertext, cipher, plaintext, (err) => {
//   if(err) console.error('Decryption failed');
//   console.log("Decryption completed");
// })
