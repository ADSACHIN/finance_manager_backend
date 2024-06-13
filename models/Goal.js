const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  targetDate: {
    type: Date,
    required: true
  },
  currentAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
