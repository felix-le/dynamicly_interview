const express = require('express');
const router = express.Router();
const expenseCtrl = require('../../controllers/expenseCtrl');

router.get('/', expenseCtrl.get);
router.delete('/:id', expenseCtrl.del);
router.put('/:id', expenseCtrl.put);
router.post('/', expenseCtrl.create);
module.exports = router;
