const plaid = require('plaid');
const User = require('../models/User');

// Initialize Plaid client
const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox // Use sandbox for testing
});

const getPlaidLinkToken = async (req, res) => {
  const user = req.user;
  const { link_token } = await client.createLinkToken({
    user: {
      client_user_id: user._id.toString()
    },
    client_name: 'AI-Powered Personal Finance Manager',
    products: ['transactions'],
    country_codes: ['US'],
    language: 'en'
  });

  res.json({ link_token });
};

const exchangePlaidPublicToken = async (req, res) => {
  const { public_token } = req.body;
  const { access_token } = await client.exchangePublicToken(public_token);

  // Store the access token in user's profile
  const user = await User.findById(req.user._id);
  user.plaidAccessToken = access_token;
  await user.save();

  res.json({ message: 'Token exchanged successfully' });
};

const fetchPlaidTransactions = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { transactions } = await client.getTransactions(user.plaidAccessToken, startDate, endDate, {
    count: 250,
    offset: 0
  });

  // Process and return transactions
  res.json(transactions);
};

module.exports = { getPlaidLinkToken, exchangePlaidPublicToken, fetchPlaidTransactions };
