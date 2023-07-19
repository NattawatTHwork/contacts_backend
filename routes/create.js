var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var connection = require('../database');
const checkUserAuthorization = require('./checkUserAuthorization');

router.post('/', jsonParser, checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'INSERT INTO users (firstname, lastname, phone) VALUES (?, ?, ?)',
        [req.body.firstname, req.body.lastname, req.body.phone],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

module.exports = router;
