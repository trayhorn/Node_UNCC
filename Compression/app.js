const zlib = require('zlib');
const fs = require('fs');

const src = fs.createReadStream('./input.txt');
const dest = fs.createWriteStream('./input-compressed.txt.gz');

src.pipe(zlib.createGzip()).pipe(dest);
// src.pipe(zlib.createBrotliCompress()).pipe(dest);
// src.pipe(zlib.deflate()).pipe(dest);

