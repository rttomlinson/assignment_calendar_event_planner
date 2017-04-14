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
router.get('/', onIndex);
router.get('/users', onIndex);


module.exports = router;
