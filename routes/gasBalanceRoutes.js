const express = require('express');
const router = express.Router();
const { getGasBalance } = require('../services/gasBalanceService');

// GET get gas
router.get('/get-gas-balance', async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'The parameters networkId, chainId and address are required.' });
  }

  try {
    const balance = await getGasBalance(address);
    return res.json({ success: true, balance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST get gas
router.post('/get-gas-balance', async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'The parameters networkId, chainId and address are required.' });
  }

  try {
    const balance = await getGasBalance(address);
    return res.json({ success: true, balance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
