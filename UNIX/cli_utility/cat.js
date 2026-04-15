const {stdin, stdout, stderr, argv} = require('node:process');
const fs = require('node:fs/promises');
const path = require('node:path');

(async () => {
  const filePath = path.join(__dirname, argv[2]);
  const fileHandle = await fs.open(filePath);

  if(filePath) {
    const fileStream = fileHandle.createReadStream();
    fileStream.pipe(stdout);
    fileStream.on('end', () => {
      process.exit(0);
    })
  }

  stdin.pipe(stdout);
})()