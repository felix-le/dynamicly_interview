const Expenses = require('../models/expensesModel');
const { statusConstants } = require('../constants/status.constant');
const { responseServer, raiseException } = require('../utils/response');
const logger = require('../utils/logger');

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
      loggler.error(error);
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
      loggler.info(newExpense);

      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'Create the expense successfully',
        newExpense
      );
    } catch (error) {
      loggler.error(error);

      return raiseException(
        res,
        statusConstants.SERVER_ERROR_CODE,
        'Can not create because something'
      );
    }
  },

  del: async (req, res) => {
    try {
      await Expenses.findByIdAndDelete(req.params.id);
      loggler.info(req.params.id);

      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'Delete the expense successfully'
      );
    } catch (error) {
      loggler.error(error);

      return raiseException(
        res,
        statusConstants.SERVER_ERROR_CODE,
        'Cannot delete the expense',
        error
      );
    }
  },
  put: async (req, res) => {
    try {
      const { expense_id, description, amount } = req.body;

      if (!expense_id || !description || !amount) {
        return raiseException(
          res,
          statusConstants.SERVER_ERROR_CODE,
          'Please fill all the fields'
        );
      }

      await Expenses.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          expense_id,
          description: description.toLowerCase(),
          amount,
        }
      );
      loggler.info(req.params.id);

      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'update expense successfully'
      );
    } catch (error) {
      loggler.error(error);
      return raiseException(
        res,
        statusConstants.SERVER_ERROR_CODE,
        'Cannot update the expense',
        error
      );
    }
  },
};

module.exports = expenseCtrl;
