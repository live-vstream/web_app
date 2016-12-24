import { Router, Response, Request } from 'express';
import { User } from "./models/user.model"


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

export { userRouter }
