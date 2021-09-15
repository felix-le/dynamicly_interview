const express = require('express');
const router = express.Router();
const expensesRouter = require('./expenses');
const { statusConstants } = require('../constants/status.constant');
router.get('/', function (req, res, next) {
  res.status(statusConstants.SUCCESS_CODE).json('Hello from server');
});

router.use('/expense', expensesRouter);

module.exports = router;
