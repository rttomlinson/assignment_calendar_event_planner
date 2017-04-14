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
  User.create({
    fname: req.body.fname,
    lname: req.body.lname,
    username: req.body.username,
    email: req.body.email
  })
    .then(function() {
      res.redirect("users");
    })
    .catch(e => res.status(500).send(e.stack));
};

let onEdit = (req, res) => {
  User.findById(req.params.id).then(user => {
    user = user.dataValues;
    res.render("users/edituser", {
      user
    });
  });
};

let editUser = (req, res) => {
  console.log(req.body);
  User.update(
    {
      fname: req.body.fname,
      lname: req.body.lname,
      username: req.body.username,
      email: req.body.email
    },
    {where: {id: req.params.id}}
  )
    .then(function() {
      res.redirect("/users");
    })
    .catch(e => res.status(500).send(e.stack));
};

let deleteUser = (req, res) => {
  User.destroy({
    where: {id: req.params.id},
    limit: 1
  })
    .then(() => {
      req.method = "GET";
      res.redirect("/users");
    })
    .catch(e => res.status(500).send(e.stack));
};

router.get("/", onIndex);
router.get("/users", onIndex);
router.get("/users/new", newUserForm);
router.get("/users/:id", onShow);
router.get("/users/:id/edit", onEdit);
router.delete("/users/:id/", deleteUser);
router.post("/users/new", addUser);
router.post("/users/:id/edit", editUser);

module.exports = router;
