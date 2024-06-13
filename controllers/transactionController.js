const Transaction = require('../models/Transaction');
const asyncHandler = require('express-async-handler');

// @desc    Create new transaction
// @route   POST /api/transactions
// @access  Private
const addTransaction = asyncHandler(async (req, res) => {
  const { amount, category, date, description } = req.body;

  const transaction = new Transaction({
    user: req.user._id,
    amount,
    category,
    date,
    description
  });

  const createdTransaction = await transaction.save();
  res.status(201).json(createdTransaction);
});

// @desc    Get all transactions for user
// @route   GET /api/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id });
  res.json(transactions);
});

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = asyncHandler(async (req, res) => {
  const { amount, category, date, description } = req.body;

  const transaction = await Transaction.findById(req.params.id);

  if (transaction && transaction.user.toString() === req.user._id.toString()) {
    transaction.amount = amount;
    transaction.category = category;
    transaction.date = date;
    transaction.description = description;

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } else {
    res.status(404);
    throw new Error('Transaction not found or user not authorized');
  }
});

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    await transaction.deleteOne(); // Use deleteOne() instead of remove()

    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
};
