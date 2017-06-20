var bodyParser = require("body-parser");
var Models = require("../models/models.js");

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

    var saver = new Models.User(content);
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
        var chat_saver = new Models.Chat(chat_content);
        chat_saver.save(function(er, dt) {
          if (er) {
            return sendStatus(404);
          }
          response = { code: randomCode };
          return res.json(response);
        });
      });
  });
  app.post("/user-chat", jsonParser, function(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }
    if (!req.body.code || !req.body.msg) {
      return res.sendStatus(400);
    }
    var query = Models.User.findOne({ code: req.body.code });
    query.exec(function(er, dt) {
      if (er) {
        return res.sendStatus(404);
      }
      if (!dt) {
        return res.sendStatus(404);
      }

      var d = new Date();
      var currentTime = d.getTime();
      var content = {
        code: req.body.code,
        msg: req.body.msg,
        sender: 1,
        time: currentTime
      };
      var saver = new Models.Chat(content);
      saver.save(function(err, data) {
        if (err) {
          return res.sendStatus(404);
        }
        data_send = { status: 1 };
        return res.json(data_send);
      });
    });
  });
  app.post("/user-chat-grabber", jsonParser, function(req, res) {
    if (!req.body) {
      console.log(1);
      return res.sendStatus(400);
    }
    if (!req.body.code || !req.body.time) {
      console.log(2);
      return res.sendStatus(400);
    }
    var query = Models.User.findOne({ code: req.body.code });
    query.exec(function(er, dt) {
      if (er) {
        return res.sendStatus(404);
      }
      if (!dt) {
        return res.sendStatus(404);
      }
      if (!Number.isInteger(req.body.time)) {
        console.log(3);
        return res.sendStatus(400);
      }
      var query2 = Models.Chat.find({
        time: { $gt: req.body.time },
        code: req.body.code
      });
      query2.exec(function(err, data) {
        if (err) {
          console.log(4);
          return res.sendStatus(400);
        }
        return res.json(data);
      });
    });
  });
};
