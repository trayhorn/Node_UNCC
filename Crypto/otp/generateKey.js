const crypto = require('node:crypto');
const fs = require('node:fs');

const key = crypto.randomBytes(100); // 100 bytes of truly random data

fs.writeFileSync('./key', key);