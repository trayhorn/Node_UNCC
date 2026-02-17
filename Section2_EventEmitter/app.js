const EventEmitter = require('node:events');

class Emitter extends EventEmitter {};

const myE = new Emitter();

myE.on('foo', () => {
  console.log('This is foo event');
})

myE.emit('foo');