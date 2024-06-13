const asyncHandler = require('express-async-handler');
const Budget = require('../models/Budget');

// @desc    Create new budget
// @route   POST /api/budgets
// @access  Private
const addBudget = asyncHandler(async (req, res) => {
  const { category, limit, startDate, endDate } = req.body;

  const budget = new Budget({
    user: req.user._id,
    category,
    limit,
    startDate,
    endDate
  });

  const createdBudget = await budget.save();
  res.status(201).json(createdBudget);
});

// @desc    Get all budgets for user
// @route   GET /api/budgets
// @access  Private
const getBudgets = asyncHandler(async (req, res) => {
  const budgets = await Budget.find({ user: req.user._id });
  res.json(budgets);
});

// @desc    Update a budget
// @route   PUT /api/budgets/:id
// @access  Private
const updateBudget = asyncHandler(async (req, res) => {
  const { category, limit, startDate, endDate } = req.body;

  const budget = await Budget.findById(req.params.id);

  if (budget && budget.user.toString() === req.user._id.toString()) {
    budget.category = category;
    budget.limit = limit;
    budget.startDate = startDate;
    budget.endDate = endDate;

    const updatedBudget = await budget.save();
    res.json(updatedBudget);
  } else {
    res.status(404);
    throw new Error('Budget not found or user not authorized');
  }
});

// @desc    Delete a budget
// @route   DELETE /api/budgets/:id
// @access  Private
const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    await budget.deleteOne(); // Use deleteOne() instead of remove()

    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  addBudget,
  getBudgets,
  updateBudget,
  deleteBudget
};
