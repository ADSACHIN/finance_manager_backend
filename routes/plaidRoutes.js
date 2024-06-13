const express = require('express');
const { getPlaidLinkToken, exchangePlaidPublicToken, fetchPlaidTransactions } = require('../controllers/plaidController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/link-token').post(protect, getPlaidLinkToken);
router.route('/exchange-token').post(protect, exchangePlaidPublicToken);
router.route('/transactions').get(protect, fetchPlaidTransactions);

module.exports = router;
