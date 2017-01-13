var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
 
var StreamSchema = new Schema({
  name: {
        type: String,
        required: true
    },
  token: {
        type: String,
        required: true,
        unique: true
    },
  created_by: {
      type: ObjectId, ref: 'UserSchema' 
  }
});

export var Stream = mongoose.model('Stream', StreamSchema);