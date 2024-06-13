const asyncHandler = require('express-async-handler');
const Goal = require('../models/Goal');

// @desc    Create new goal
// @route   POST /api/goals
// @access  Private
const addGoal = asyncHandler(async (req, res) => {
  const { name, amount, targetDate } = req.body;

  const goal = new Goal({
    user: req.user._id,
    name,
    amount,
    targetDate
  });

  const createdGoal = await goal.save();
  res.status(201).json(createdGoal);
});

// @desc    Get all goals for user
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user._id });
  res.json(goals);
});

// @desc    Update a goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const { name, amount, targetDate, currentAmount } = req.body;

  const goal = await Goal.findById(req.params.id);

  if (goal && goal.user.toString() === req.user._id.toString()) {
    goal.name = name;
    goal.amount = amount;
    goal.targetDate = targetDate;
    goal.currentAmount = currentAmount;

    const updatedGoal = await goal.save();
    res.json(updatedGoal);
  } else {
    res.status(404);
    throw new Error('Goal not found or user not authorized');
  }
});

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @access  Private

const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    await goal.deleteOne(); // Use deleteOne() instead of remove()

    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addGoal,
  getGoals,
  updateGoal,
  deleteGoal
};
