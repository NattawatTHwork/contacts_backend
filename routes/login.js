var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const bcrypt = require('bcrypt');
var connection = require('../database');
var jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.SECRET_KEY;

router.post('/', jsonParser, (req, res, next) => {
    connection.execute(
        'SELECT * FROM admin WHERE email=?',
        [req.body.email],
        (err, users, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            if (users.length == 0) {
                res.json({ status: 'nofound', message: 'No user found.' });
                return;
            }
            bcrypt.compare(req.body.password, users[0].password, function (err, isLogin) {
                if (isLogin) {
                    var token = jwt.sign({ email: users[0].email }, secret, { expiresIn: '1h' });
                    res.json({ status: 'success', message: 'login success', token });
                } else {
                    res.json({ status: 'error', message: 'login failed' });
                }
            });
        }
    );
});

module.exports = router;
