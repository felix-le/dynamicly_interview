const express = require('express');
const router = express.Router();
const expenseCtrl = require('../../controllers/expenseCtrl');

router.get('/', expenseCtrl.get);

module.exports = router;
