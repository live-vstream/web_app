import { User } from './routes/models/user.model'
import { secret } from './config'
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
 
module.exports = function(passport) {
  var opts = { secretOrKey: secret, jwtFromRequest: ExtractJwt.fromAuthHeader() };
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};