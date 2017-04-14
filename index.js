const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
/////////////**************Set up routes*************/////////////
const usersRoutes = require("./routes/users");
const calendarsRoutes = require("./routes/calendars");
/////////////**************End routers*************/////////////
const expressHandlebars = require("express-handlebars");
const hbs = expressHandlebars.create({
  partialsDir: "views/",
  defaultLayout: "application"
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use((req, res, next) => {
  var method;
  if (req.query._method) {
    method = req.query._method;
    delete req.query._method;
  } else if (typeof req.body === "object" && req.body._method) {
    method = req.body._method;
    delete req.body._method;
  }
  if (method) {
    method = method.toUpperCase();
    req.method = method;
  }
  next();
});
app.use(morgan("tiny"));
app.use((req, res, next) => {
  ["query", "params", "body"].forEach(key => {
    if (req[key]) {
      var capKey = key[0].toUpperCase() + key.substr(1);
      var value = JSON.stringify(req[key], null, 2);
      console.log(`${capKey}: ${value}`);
    }
  });
  next();
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.use("/", usersRoutes);
app.use("/calendars", calendarsRoutes);
app.listen(process.env.PORT || 3000, () => {
  console.log("Hey.");
});

//yarn add express express-handlebars
