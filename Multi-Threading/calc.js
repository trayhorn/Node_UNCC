const { Worker, workerData, parentPort } = require("node:worker_threads");

const port = parentPort;

port.postMessage('some text for testing');

port.on('message', (msg) => {
  console.log('Worker received: ', msg);
})