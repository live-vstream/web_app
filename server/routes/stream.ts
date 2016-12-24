import { Router, Response, Request } from 'express';

var mongoose = require('mongoose');

const streamRouter: Router = Router();

// Set up mongodb connection
mongoose.connect('mongodb://admin:admin123@localhost:27017/admin');
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', function() {
  console.log('Connected to MongoDB ;)');

  streamRouter.post('/', (request: Request, response: Response) => {
	

	});

});


export { streamRouter }
