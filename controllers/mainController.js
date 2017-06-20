var mongoose = require("mongoose");
var bodyParser = require("body-parser");
mongoose.connect("mongodb://test:test@ds151461.mlab.com:51461/my_mongo_db");

var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  responded: { type: Number, required: true },
  code: { type: String, required: true },
  time: { type: Number, required: true }
});
var User = mongoose.model("userReg", userSchema);

var chatSchema = new Schema({
  code: { type: String, required: true },
  msg: { type: String, required: true },
  sender: { type: Number, required: true },
  time: { type: Number, required: true }
});
var Chat = mongoose.model("userChar", chatSchema);

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
  app.post("/user-register", jsonParser, function(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }
    if (
      !req.body.name || !req.body.email || !req.body.mobile || !req.body.msg
    ) {
      return res.sendStatus(400);
    }
    if (
      req.body.name == "" ||
      req.body.email == "" ||
      req.body.mobile == "" ||
      req.body.msg == ""
    ) {
      return res.sendStatus(400);
    }

    var randomCode = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 50; i++) {
      randomCode += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    }

    var d = new Date();
    var currentTime = d.getTime();
    var content = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      responded: 0,
      code: randomCode,
      time: currentTime
    };

    var saver = new User(content);
    saver
      .save(function(err, data) {
        if (err) {
          return res.sendStatus(404);
        }

        // return res.json(data);
      })
      .then(e => {
        var chat_content = {
          code: randomCode,
          msg: req.body.msg,
          sender: 1,
          time: currentTime
        };
        var chat_saver = new Chat(chat_content);
        chat_saver.save(function(er, dt) {
          if (er) {
            return sendStatus(404);
          }
          response = { code: randomCode };
          return res.json(response);
        });
      });
  });
};
