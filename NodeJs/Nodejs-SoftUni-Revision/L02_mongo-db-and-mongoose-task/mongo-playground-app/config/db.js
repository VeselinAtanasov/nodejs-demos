const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const connectionStr = 'mongodb://localhost:27017/mongoplayground';

module.exports = mongoose.connect(connectionStr);
