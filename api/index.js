const express = require('express');
const { getGasBalance } = require('../services/gasBalanceService');

const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// GET /api/get-gas-balance
app.get('/get-gas-balance', async (req, res) => {
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

// POST /api/get-gas-balance
app.post('/get-gas-balance', async (req, res) => {
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

// Exporter Express pour que Vercel puisse le reconnaître
module.exports = app;
