const { Buffer } = require('buffer');
console.log(Buffer.poolSize);

const memoryContainer = Buffer.alloc(4); // 4 bytes (32 bits)

memoryContainer[0] = 0xf4;
memoryContainer[1] = 0x34;
memoryContainer[2] = 0xb4;
memoryContainer[3] = 0xff;

console.log(memoryContainer);

const buff = Buffer.from("f434b4ff", "hex");

console.log(buff.toString('hex'));