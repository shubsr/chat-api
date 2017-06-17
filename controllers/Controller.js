var mongoose = require("mongoose");
var bodyParser = require("body-parser");
mongoose.connect("mongodb://test:test@ds151461.mlab.com:51461/my_mongo_db");
var Schema = mongoose.Schema;

var nameSchema = new Schema({
  name: { type: String, required: true }
});

var Name = mongoose.model("AllNames", nameSchema);

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
  app.post("/names", jsonParser, function(req, res) {
    if (!req.body.name) {
      return res.sendStatus(400);
    }
    var content = { name: req.body.name };
    var data = new Name(content);
    data.save(function(err, dt) {
      if (err) {
        return res.sendStatus(404);
      }
      return res.json(dt);
    });
  });
  app.get("/names", function(req, res) {
    var content = { name: req.query.name };
    var data = new Name(content);
    data.save(function(err, dt) {
      if (err) {
        return res.sendStatus(404);
      }
      return res.json(dt);
    });
  });
};
