var bodyParser = require("body-parser");
var Models = require("../models/models.js");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
  app.post("/all-chats-admin", jsonParser, function(req, res) {
    if (!req.body) {
      return res.sendStatus(404);
    }
    if (req.body.code != "admin") {
      return res.sendStatus(404);
    }
    Models.User.find().exec(function(err, data) {
      if (err) {
        return res.sendStatus(400);
      }
      return res.json(data);
    });
  });

  //   app.post("/aa-user-chat", jsonParser, function(req, res) {

  //     if (!req.body) {

  //       return res.sendStatus(400);

  //     }

  //     if (!req.body.code || !req.body.msg) {

  //       return res.sendStatus(400);

  //     }

  //     var query = User.findOne({ code: req.body.code });

  //     query.exec(function(er, dt) {

  //       if (er) {

  //         return res.sendStatus(404);

  //       }

  //       if (!dt) {

  //         return res.sendStatus(404);

  //       }

  //       var d = new Date();

  //       var currentTime = d.getTime();

  //       var content = {

  //         code: req.body.code,

  //         msg: req.body.msg,

  //         sender: 1,

  //         time: currentTime

  //       };

  //       var saver = new Chat(content);

  //       saver.save(function(err, data) {

  //         if (err) {

  //           return res.sendStatus(404);

  //         }

  //         data_send = { status: 1 };

  //         return res.json(data_send);

  //       });

  //     });

  //   });
};
