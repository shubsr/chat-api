var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
// var cookieParser = require("cookie-parser");
// var session = require("express-session");

var theControllers = require("./controllers/Controller");
var chatController = require("./controllers/ChatController");
var mainController = require("./controllers/mainController");
var userController = require("./controllers/userController");
var adminController = require("./controllers/adminController");

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cookieParser());
// app.use(
//   session({
//     secret: "dsfdafgdsfw454fg635uhg546y76g5643",
//     resave: false,
//     saveUninitialized: true
//   })
// );

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

// firing my controllers from Controller.js file
theControllers(app);

// firing the ChatController
chatController(app);

// firing the mainController
mainController(app);

// firing the userController
userController(app);

// firing the adminController
adminController(app);

app.listen(3001, function() {
  console.log("Running on port 3001");
});
