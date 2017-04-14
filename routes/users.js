var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var sequelize = models.sequelize;

var onIndex = (req, res) => {
    User.findAll()
        .then((users) => {
            res.render('users/index', {
                users
            });
        })
        .catch((e) => res.status(500).send(e.stack));
};

let onShow = (req, res) => {
    User.findById(req.params.id).then((user) => {
        console.log(user.dataValues);
    }).catch((err) => {
        console.error(err);
    });
};


router.get('/', onIndex);
router.get('/users', onIndex);
router.get('/users/:id', onShow);


module.exports = router;
