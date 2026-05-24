const {workerData, parentPort} = require('node:worker_threads');
const generatePrimes = require('./prime-generator.js');


const primes = generatePrimes(workerData.count, workerData.start, {format: true});
parentPort.postMessage(primes);