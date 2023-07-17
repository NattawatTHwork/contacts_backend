const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = 'Fullstack-Login-2021';
const jsonParser = bodyParser.json();

router.post('/auth', jsonParser, (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    res.json({ status: 'success', decoded });
  } catch (err) {
    res.json({ status: 'error', message: err.message });
  }
});

module.exports = router;
