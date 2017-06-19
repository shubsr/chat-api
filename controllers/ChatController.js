var mongoose = require("mongoose");
var bodyParser = require("body-parser");
mongoose.connect("mongodb://test:test@ds151461.mlab.com:51461/my_mongo_db");
var Schema = mongoose.Schema;

var chatSchema = new Schema({
  name: { type: String, required: true },
  msg: { type: String, required: true },
  date: Number
});

var Chats = mongoose.model("Chats", chatSchema);

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
  app.post("/chat", jsonParser, function(req, res) {
    if (!req.body.name) {
      return res.sendStatus(400);
    }
    var d = new Date();
    var the_time = d.getTime();
    // console.log(the_time);
    var content = { name: req.body.name, msg: req.body.msg, date: the_time };
    var data = new Chats(content);
    data
      .save(function(err, dt) {
        if (err) {
          return res.sendStatus(404);
        }
      })
      .then(e => {
        var query = Chats.find({ date: { $gt: req.body.time } });
        // console.log(req.body.time);
        query.exec(function(err, dt) {
          if (err) {
            return res.sendStatus(404);
          }
          return res.json(dt);
        });
      });
  });
  app.post("/chat-fetcher", jsonParser, function(req, res) {
    if (!req.body.time) {
      return res.sendStatus(400);
    }
    var query = Chats.find({ date: { $gt: req.body.time } });
    query.exec(function(err, dt) {
      if (err) {
        return res.sendStatus(404);
      }
      return res.json(dt);
    });
  });
};
