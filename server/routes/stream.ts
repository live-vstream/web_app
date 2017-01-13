import { Router, Response, Request } from 'express';
import {db} from "../dbconnect";
import { User } from "./models/user.model";
import { Stream } from "./models/stream.model";
import { passport } from "./user";
import { secret } from "../config";

var jwt = require('jwt-simple');


const streamRouter: Router = Router();

streamRouter.post('/', passport.authenticate("jwt", { session: false}),
	(request: Request, response: Response) => {

	var token = getToken(request.headers);

	if(token) {
		var decoded = jwt.decode(token, secret);

		User.findOne({ name: decoded.name}, function(err, user) {
			if(err) throw err;

			if(!user) {
				response.status(403).send({success: false, msg: "Invalid token or user not found"});

			} else {
				// now we generate a token for the stream
				var newStreamToken = generateStreamToken();
				var newStream = new Stream({
					name: request.body.name,
					token: newStreamToken,
					created_by: user._id
				})
				newStream.save(function(err) {
					if (err) {
						return response.json({success: false, msg: 'Stream already exists.'});
					}
					response.json({success: true, msg: 'Successful created new stream.', token: newStreamToken});
				});

			}
			
		});
	} else {
		// no user token was provided
		return response.status(403).send({success: false, msg: 'No token provided'});
	}

});

// returns a token present in headers
var getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

function generateStreamToken(): any {
    return Math.random().toString(36).substr(12);
};



export { streamRouter }
