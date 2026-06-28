const crypto = require('node:crypto');

const hashFunction = crypto.createHash("sha256")

hashFunction.update("hello");
hashFunction.update("Some more text");
const digest = hashFunction.digest('hex');

console.log(digest);