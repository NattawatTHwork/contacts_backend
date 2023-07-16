var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const bcrypt = require('bcrypt');
var connection = require('../database');
var jwt = require('jsonwebtoken');
const secret = 'Fullstack-Login-2021';

router.post('/', jsonParser, (req, res, next) => {
    connection.execute(
        'SELECT * FROM admin WHERE email=?',
        [req.body.email],
        function (err, users, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            if (users.length == 0) {
                res.json({ status: 'nofound', message: 'No user found.' });
                return;
            }
            bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
                if (isLogin) {
                    var token = jwt.sign({ email: users[0].email }, secret, { expiresIn: '1h' });
                    res.json({ status: 'ok', message: 'login success', token });
                } else {
                    res.json({ status: 'error', message: 'login failed' });
                }
            });
        }
    );
});

module.exports = router;
