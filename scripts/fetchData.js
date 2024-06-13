const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const Goal = require('../models/Goal');

async function fetchData() {
  await mongoose.connect('mongodb+srv://adsachin14:Tp7uQICrTpytfQFi@clusterfinance.dvxkbgz.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const transactions = await Transaction.find({}).lean();
  const budgets = await Budget.find({}).lean();
  const goals = await Goal.find({}).lean();

  mongoose.connection.close();
  
  return { transactions, budgets, goals };
}

fetchData().then(data => {
  console.log(data);
});
