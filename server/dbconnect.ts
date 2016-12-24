var mongoose = require('mongoose');
// Set up mongodb connection
mongoose.connect('mongodb://admin:admin123@localhost:27017/admin');
export var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB ;)');
});