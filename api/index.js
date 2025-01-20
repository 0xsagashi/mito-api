const express = require('express');
const { getGasBalance } = require('../services/gasBalanceService');

const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// GET /api/get-gas-balance
app.get('/api/get-gas-balance', async (req, res) => {
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

// POST /api/get-gas-balance
app.post('/api/get-gas-balance', async (req, res) => {
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


module.exports = app;
/*module.exports = (req, res) => {
  res.status(200).json({ message: 'API is working' });
};*/
