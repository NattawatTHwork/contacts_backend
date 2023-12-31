var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var connection = require('../database');

router.post('/', jsonParser, (req, res, next) => {
    const email = req.body.email;
    connection.execute(
        'SELECT * FROM admin WHERE email = ?',
        [email],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }

            if (results.length > 0) {
                res.json({ status: 'exists', message: 'Email already exists' });
                return;
            }

            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                connection.execute(
                    'INSERT INTO admin (email, password, fname, lname) VALUES (?, ?, ?, ?)',
                    [email, hash, req.body.fname, req.body.lname],
                    function (err, results, fields) {
                        if (err) {
                            res.json({ status: 'error', message: err });
                            return;
                        }
                        res.json({ status: 'success', message: 'Register Success' });
                    }
                );
            });
        }
    );
});


module.exports = router;
