const express = require('express');
const {
  addBudget,
  getBudgets,
  updateBudget,
  deleteBudget
} = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, addBudget)
  .get(protect, getBudgets);

router.route('/:id')
  .put(protect, updateBudget)
  .delete(protect, deleteBudget);

module.exports = router;
