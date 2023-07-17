var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var connection = require('../database');

router.put('/:id', jsonParser, (req, res, next) => {
  connection.execute(
    'UPDATE users SET firstname = ?, lastname = ?, phone = ? WHERE user_id = ?',
    [req.body.firstname, req.body.lastname, req.body.phone, req.params.id],
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
