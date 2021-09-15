const Expenses = require('../models/expensesModel');
const { statusConstants } = require('../constants/status.constant');
const { responseServer, raiseException } = require('../utils/response');
const expenseCtrl = {
  get: async (req, res) => {
    try {
      const expenses = await Expenses.find();

      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'get data successfully',
        expenses
      );
    } catch (error) {
      return raiseException(res, statusConstants.SERVER_ERROR_CODE, error);
    }
  },
  create: async (req, res) => {
    try {
      const { expense_id, description, amount } = req.body;
      const isExpenseExist = await Expenses.findOne({ expense_id });
      if (isExpenseExist)
        return raiseException(
          res,
          statusConstants.SERVER_ERROR_CODE,
          'The expense already exists'
        );
      const newExpense = new Expenses({
        expense_id,
        description: description.toLowerCase(),
        amount,
      });
      await newExpense.save();
      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'Create the expense successfully',
        newExpense
      );
    } catch (error) {
      raiseException(
        res,
        statusConstants.SERVER_ERROR_CODE,
        'Can not create because something'
      );
    }
  },
  put: async (req, res) => {
    res.json('test expense');
  },

  del: async (req, res) => {
    res.json('test expense');
  },
};

module.exports = expenseCtrl;
