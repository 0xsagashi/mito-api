const express = require('express');
const router = express.Router();
const { getGasBalance } = require('../services/gasBalanceService');

// Route GET pour récupérer le solde de gas
router.get('/get-gas-balance', async (req, res) => {
  const { networkId, chainId, address } = req.query;

  if (!networkId || !chainId || !address) {
    return res.status(400).json({ error: 'The parameters networkId, chainId and address are required.' });
  }

  try {
    const balance = await getGasBalance(networkId, chainId, address);
    return res.json({ success: true, balance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Route POST pour récupérer le solde de gas
router.post('/get-gas-balance', async (req, res) => {
  const { networkId, chainId, address } = req.body;

  if (!networkId || !chainId || !address) {
    return res.status(400).json({ error: 'The parameters networkId, chainId and address are required.' });
  }

  try {
    const balance = await getGasBalance(networkId, chainId, address);
    return res.json({ success: true, balance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
