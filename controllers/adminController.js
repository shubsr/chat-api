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

  app.post("/admin-chat", jsonParser, function(req, res) {
    if (!req.body) {
      return res.sendStatus(404);
    }
    if (!req.body.code || !req.body.time || !req.body.userCode) {
      return res.sendStatus(404);
    }
    if (req.body.code != "admin") {
      return res.sendStatus(404);
    }
    Models.User.findOne({ code: req.body.userCode }).exec(function(err, data) {
      if (err) {
        return res.sendStatus(400);
      }
      if (!data) {
        return res.sendStatus(404);
      }
      Models.Chat
        .find({ time: { $gt: req.body.time }, code: req.body.userCode })
        .exec(function(er, dt) {
          if (er) {
            return res.sendStatus(400);
          }
          return res.json(dt);
        });
    });
  });

  app.post("/admin-responded", jsonParser, function(req, res) {
    if (!req.body) {
      return res.sendStatus(404);
    }
    if (!req.body.code || !req.body.userCode) {
      return res.sendStatus(404);
    }
    if (req.body.code != "admin") {
      return res.sendStatus(404);
    }

    Models.User.update(
      { code: req.body.userCode },
      { $set: { responded: 1 } },
      function(err, data) {
        if (err) {
          return res.sendStatus(404);
        }
        data_send = { status: 1 };
        return res.json(data_send);
      }
    );
  });

  app.post("/admin-sender", jsonParser, function(req, res) {
    if (!req.body) {
      return res.sendStatus(404);
    }
    if (!req.body.code || !req.body.msg || !req.body.userCode) {
      return res.sendStatus(404);
    }
    if (req.body.code != "admin") {
      return res.sendStatus(404);
    }

    var query = Models.User.findOne({ code: req.body.userCode });

    query.exec(function(er, dt) {
      if (er) {
        return res.sendStatus(404);
      }
      if (!dt) {
        return res.sendStatus(404);
      }
      if (req.body.code != "admin") {
        return res.sendStatus(404);
      }

      var d = new Date();

      var currentTime = d.getTime();

      var content = {
        code: req.body.userCode,
        msg: req.body.msg,
        sender: 0,
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
};
