const fs = require("node:fs/promises");

(async () => {
  const fileHandleRead = await fs.open("source.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");

  const streamRead = fileHandleRead.createReadStream();
  const streamWrite = fileHandleWrite.createWriteStream();

  let split = "";

  streamRead.on("data", (chunk) => {
    const numbers = chunk.toString("utf-8").split("  ");

    if(Number(numbers[0]) !== Number(numbers[1] - 1)) {
      if(split) numbers[0] = split + numbers[0];
    }

    if (
      Number(numbers[numbers.length - 2]) + 1 !==
      Number(numbers[numbers.length - 1])
    ) {
      split = numbers.pop();
    }

    numbers.forEach(n => {
      let num = Number(n);

      if(num % 2 ===0) {
        if(!streamWrite.write(` ${num} `)) {
          streamRead.pause();
        }
      }
    })
  });

  streamWrite.on("drain", () => {
    streamRead.resume();
  });

  streamRead.on("end", () => {
    fileHandleRead.close();
    streamWrite.end();
  });

  streamWrite.on("finish", () => {
    fileHandleWrite.close();
  });
})();