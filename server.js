var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var theControllers = require("./controllers/Controller");

var app = express();
// app.set("port", process.env.PORT || 3000);

mongoose.connect("mongodb://test:test@ds151461.mlab.com:51461/my_mongo_db");

var Schema = mongoose.Schema;
var nameSchema = new Schema({
  name: { type: String, required: true },
  age: Number
});

var Name = mongoose.model("Names", nameSchema);

// var Name = mongoose.model("name_1", nameSchema);

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/", function(req, res) {
  res.send("hello there");
});

// app.get("/names", function(req, res) {
//   var content = { name: req.query.name };
//   var data = new Name(content);
//   data.save(function(err, dt) {
//     if (err) {
//       return res.sendResponse(404);
//     }
//     return res.send(dt);
//   });
// });

// firing my controllers from Controller.js file
theControllers(app);

// app.listen(app.get("port"), function() {
//   console.log("Running...");
// });

app.listen(3001, function() {
  console.log("Running on port 3001");
});
