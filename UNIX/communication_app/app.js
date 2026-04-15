const {spawn} = require('node:child_process');
const fs = require('node:fs');
const { stdin } = require('node:process');

const numberFormatter = spawn('./number_formatter', ['dest.txt', '$', ","]);

numberFormatter.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
})

numberFormatter.stderr.on('data', (data) => {
  console.log(`stderr is ${data}`);
})

numberFormatter.on('close', (code) => {
  if(code === 0) {
    console.log('The file was read, processed and written successfully');
  } else {
    console.log('Something unexpected happened');
  }
})

const fileStream = fs.createReadStream('./src.txt');
fileStream.pipe(numberFormatter.stdin);