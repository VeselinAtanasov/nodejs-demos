const Events = require('events');

let eventEmitter = new Events.EventEmitter();

eventEmitter.on('fireAlarm', (data) => {
  console.log('The team is on fire!'+ data);
});

eventEmitter.emit('fireAlarm', '...');
