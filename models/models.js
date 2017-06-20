var mongoose = require("mongoose");
mongoose.connect("mongodb://test:test@ds151461.mlab.com:51461/my_mongo_db");

var Schema = mongoose.Schema;

var userListSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  responded: { type: Number, required: true },
  code: { type: String, required: true },
  time: { type: Number, required: true }
});
var User = mongoose.model("userReg", userListSchema);

var chatSchema = new Schema({
  code: { type: String, required: true },
  msg: { type: String, required: true },
  sender: { type: Number, required: true },
  time: { type: Number, required: true }
});
var Chat = mongoose.model("userChar", chatSchema);

exports.User = User;
exports.Chat = Chat;
