const express = require('express');
const {
  addGoal,
  getGoals,
  updateGoal,
  deleteGoal
} = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, addGoal)
  .get(protect, getGoals);

router.route('/:id')
  .put(protect, updateGoal)
  .delete(protect, deleteGoal);

module.exports = router;
