const express = require('express');
const router = express.Router();
// const expenses = require('./expenses');

router.get('/', function (req, res, next) {
  res.status(200).json('Hello from server');
});

// router.use()

module.exports = router;
