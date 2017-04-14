var express = require("express");
var router = express.Router();
var models = require("../models");
var User = models.User;
var sequelize = models.sequelize;

var onIndex = (req, res) => {
  User.findAll()
    .then(users => {
      res.render("users/index", {
        users
      });
    })
    .catch(e => res.status(500).send(e.stack));
};

let onShow = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user = user.dataValues;
      res.render("users/showuser", {
        user
      });
    })
    .catch(e => res.status(500).send(e.stack));
};

let newUserForm = (req, res) => {
  res.render("users/newuser");
};

let addUser = (req, res) => {
  console.log(req.body);
};
router.get("/", onIndex);
router.get("/users", onIndex);
router.get("/users/new", newUserForm);
router.get("/users/:id", onShow);
router.post("/users/new", addUser);

module.exports = router;
