const cluster = require("node:cluster");
const { availableParallelism } = require("node:os");

if (cluster.isPrimary) {
  console.log(`This is a parent with PID ${process.pid}`);

  let requestCount = 0;

  setInterval(() => {
    console.log(`Total number of requests: ${requestCount}`);
  }, 5000);

  const coresCount = availableParallelism();
  for (let i = 0; i < coresCount; i++) {
    const worker = cluster.fork();
    worker.send("some data");
    console.log(
      `The parent process spawned a new child procedd with PID ${worker.process.pid}`,
    );
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} ${signal || code} died. Restarting...`,
    );
    cluster.fork();
  });

  cluster.on("message", (worker, message) => {
    if (message.action && message.action === "request") {
      requestCount++;
    }
  });

  cluster.on('listening', (worker, address) => {});
  
  cluster.on('fork', (worker) => {});
} else {
  require("./server.js");
}
