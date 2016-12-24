var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/
 
// set up a mongoose model
// TODO: add more fields that may be required
var UserSchema = new Schema({
  name: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    }
});

/*
 * We don’t want to store the passwords in clear text, 
 * so whenever we want to save a user, we salt the password and 
 * store this value to our DB. This also means, we have to add a 
 * special compare method to compare those passwords, 
 * so we never get our hands on the real value of the user’s password!
 *
 * We define a function, that will be executed first on calling save()
 * method on any User db model. This function will salt the password,
 * so that we can store that salt in db instead of plain text
 */
 
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

/*
 * We define a function that will compare password with the 
 * salt stored in db and provide a callback through
 * the paramater cb.
 */
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
 
// export that User model, which can be used to create new User
// objects or perform db operations on UserSchema
export var User = mongoose.model('User', UserSchema);