const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const index = require("./routes/index");
const expressHandlebars = require("express-handlebars");
const hbs = expressHandlebars.create({
  partialsDir: "views/",
  defaultLayout: "application"
});

app.use(bodyParser.urlencoded({extended: true}));
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

app.use("/", index);

app.listen(3000, () => {
  console.log("Hey.");
});

//yarn add express express-handlebars
