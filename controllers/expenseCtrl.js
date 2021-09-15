const Expenses = require('../models/expensesModel');
const { statusConstants } = require('../constants/status.constant');
const { responseServer, raiseException } = require('../utils/response');
const logger = require('../utils/logger');

// filter, sort, pagination

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excluedFields = ['page', 'sort', 'limit'];
    excluedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => '$' + match
    );

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      // console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 3;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const expenseCtrl = {
  get: async (req, res) => {
    try {
      const features = new APIfeatures(Expenses.find(), req.query)
        .filtering()
        .sorting()
        .pagination();
      // const expenses = await Expenses.find();
      const expenses = await features.query;

      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'get data successfully',
        expenses
      );
    } catch (error) {
      logger.error(error);
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
      logger.info(newExpense);

      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'Create the expense successfully',
        newExpense
      );
    } catch (error) {
      logger.error(error);

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
      logger.info(req.params.id);

      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'Delete the expense successfully'
      );
    } catch (error) {
      logger.error(error);

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

      const isExpenseExist = await Expenses.findOne({ expense_id });

      if (isExpenseExist)
        return raiseException(
          res,
          statusConstants.SERVER_ERROR_CODE,
          'The expense already exists'
        );
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
      logger.info(req.params.id);

      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'update expense successfully'
      );
    } catch (error) {
      logger.error(error);
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
