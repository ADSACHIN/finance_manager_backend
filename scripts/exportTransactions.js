const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect('mongodb+srv://adsachin14:Tp7uQICrTpytfQFi@clusterfinance.dvxkbgz.mongodb.net/').then(() => {
  console.log('Connected to MongoDB');
  exportData();
}).catch((err) => {
  console.error(err);
});

const transactionSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  date: Date,
  description: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

async function exportData() {
    try {
      const transactions = await Transaction.find();
      const data = transactions.map(tx => ({
        month: new Date(tx.date).getMonth() + 1,
        weekday: new Date(tx.date).getDay(),
        amount: tx.amount,
        category: tx.category,
          description: tx.description,
          date: tx.date
      }));
      fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
      console.log('Data exported to data.json');
      process.exit();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
  