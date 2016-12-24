import { Router, Response, Request } from 'express';
import { User } from "./models/user.model";
import { secret } from "../config";

export var passport = require('passport');
require('../passport')(passport);

var jwt = require('jwt-simple');

const userRouter: Router = Router();

userRouter.post('/', (request: Request, response: Response) => {


});

// create a new user account (POST http://localhost/api/user/signup)
userRouter.post('/signup', function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {

    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
    console.log('inside save');
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

// route to authenticate a user (POST http://localhost:8080/api/user/authenticate)
userRouter.post('/authenticate', function(req: Request, res: Response) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

// route to a restricted info (GET http://localhost:8080/api/memberinfo)
userRouter.get('/profile', passport.authenticate('jwt', 
	{ session: false}), 
	function(req, res) {
	  var token = getToken(req.headers);
	  if (token) {
	    var decoded = jwt.decode(token, secret);
	    User.findOne({
	      name: decoded.name
	    }, function(err, user) {
	        if (err) throw err;
	 
	        if (!user) {
	          return res.status(403).send({success: false, 
	          	msg: 'Authentication failed. User not found.'});
	        } else {
	          res.json({success: true, 
	          	msg: 'Welcome to the profile page ' + user.name + '!'});
	        }
	    });
	  } else {
	    return res.status(403).send({success: false, msg: 'No token provided.'});
	  }
	}
);
 
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

export { userRouter }
