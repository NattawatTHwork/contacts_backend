var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var connection = require('../database');

router.get('/', jsonParser, (req, res, next) => {
    connection.execute(
        'SELECT * FROM users',
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json(results);
        }
    );
});

router.get('/:id', jsonParser, (req, res, next) => {
    connection.execute(
        'SELECT * FROM users WHERE user_id = ?',
        [req.params.id],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            if (results.length == 0) {
                res.json({ status: 'nodata', message: 'No data' });
            }
            res.json(results[0]);
        }
    );
});


module.exports = router;
