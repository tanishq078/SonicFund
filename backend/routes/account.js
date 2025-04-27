const express = require('express');
const router = express.Router();
const { Account } = require('../db');
const authMiddleware = require('../Middleware/auth');

// ✅ Get balance of the current logged-in user
router.get('/balance', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; // From authMiddleware
    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.status(200).json({ balance: account.balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    return res.status(500).json({ message: 'Server error while fetching balance' });
  }
});

// ✅ Transfer amount to another user
router.post('/transfer', authMiddleware, async (req, res) => {
  try {
    const { amount, to } = req.body;

    // Basic validation
    if (!amount || !to) {
      return res.status(400).json({ message: 'Amount and recipient are required' });
    }

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const senderAccount = await Account.findOne({ userId: req.userId });
    if (!senderAccount) {
      return res.status(404).json({ message: 'Sender account not found' });
    }

    if (senderAccount.balance < transferAmount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const recipientAccount = await Account.findOne({ userId: to });
    if (!recipientAccount) {
      return res.status(404).json({ message: 'Recipient account not found' });
    }

    // Start the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -transferAmount } });
    await Account.updateOne({ userId: to }, { $inc: { balance: transferAmount } });

    return res.status(200).json({ message: 'Transfer successful' });
  } catch (error) {
    console.error('Error during transfer:', error);
    return res.status(500).json({ message: 'Server error during transfer' });
  }
});

module.exports = router;
