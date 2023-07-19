var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var connection = require('../database');
const checkUserAuthorization = require('./checkUserAuthorization');

router.delete('/:id', jsonParser, checkUserAuthorization, (req, res, next) => {
  connection.execute(
    'DELETE FROM users WHERE user_id = ?',
    [req.params.id],
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
