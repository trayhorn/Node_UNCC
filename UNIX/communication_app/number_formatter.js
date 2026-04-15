const { stdin, stdout, stderr, argv } = require("node:process");
const fs = require("node:fs");
const path = require('node:path');

const formatterSign = argv[3];

const filePath = path.join(__dirname, argv[2]);
const fileStream = fs.createWriteStream(filePath);

stdin.pipe(fileStream);
