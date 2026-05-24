const { performance } = require("node:perf_hooks");
const { Worker } = require("node:worker_threads");

let result = [];
const THREADS = 2;
let completed = 0;
const count = 200;

const start = performance.now();

for (let i = 0; i < THREADS; i++) {
  const worker = new Worker("./calc.js", {
    workerData: { count: count / 2, start: 100_000_000_000_000 + i * 300 },
  });

  const threadId = worker.threadId;
  console.log(`Worker ${threadId} started.`);
  worker.on('message', (primes) => {
    result = result.concat(primes);
  });
  worker.on('error', (err) => {
    console.error(err);
  });
  worker.on('exit', (code) => {
    console.log(`Worker ${threadId} exited with ${code}`);
    completed++;

    if(completed === THREADS) {
      console.log(`Time Taken: ${performance.now() - start}ms`);
      console.log(result.sort());
    }

    if(code !== 0) {
      console.err('Something went wrong!');
    }
  })
}
