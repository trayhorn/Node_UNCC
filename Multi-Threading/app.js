const { Worker, MessageChannel } = require("node:worker_threads");

// new Worker("./calc.js", {
//   workerData: "text"
// });

// const channel = new MessageChannel();

// const port1 = channel.port1;
// const port2 = channel.port2;

// port1.postMessage({name: "Joe"});

// port1.on('message', (msg) => {
//   console.log(`Message received on port1:`, msg);
// })
// port2.on('message', (msg) => {
//   console.log(`Message receuved on port2:`, msg);
// })

// EXAMPLE 2 Communication between two working threads

// const { port1, port2 } = new MessageChannel();

// const thread1 = new Worker("./calc.js", { workerData: { port: port1 }, transferList: [port1] });
// const thread2 = new Worker("./calc.js", { workerData: { port: port2 }, transferList: [port2] });

// EXAMPLE 3 Communication between main thread and two worker threads

// const channel1 = new MessageChannel();
// const channel2 = new MessageChannel();

// const thread1 = new Worker("./calc.js", {
//   workerData: { port: channel1.port2 },
//   transferList: [channel1.port2],
// });
// const thread2 = new Worker("./calc.js", {
//   workerData: { port: channel2.port2 },
//   transferList: [channel2.port2],
// });

// channel1.port1.on('message', (msg) => {
//   console.log("Main thread got this message on channel 1: ", msg);
// })
// channel2.port1.on('message', (msg) => {
//   console.log("Main thread got this message on channel 2: ", msg);
// })


// Example 4

const thread1 = new Worker('./calc.js');

thread1.on('message', (msg) => {
  console.log('Main thread got this: ', msg);
})

thread1.postMessage({name: 'Joe'});