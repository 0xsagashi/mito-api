const express = require('express');
const { getGasBalance, isMitoBalance100 } = require('../services/gasBalanceService');

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
    return res.status(400).json({ error: 'Address is required.' });
  }

  try {
    const balance = await getGasBalance(address);
    return res.json({ success: true, balance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/mito-balance-100', async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({
      error: {
        code: 1,
        message: 'The parameter "address" is required.',
      },
      data: {
        result: false,
      },
    });
  }

  try {
    const result = await isMitoBalance100(address);
    return res.json({
      error: {
        code: 0,
        message: '',
      },
      data: {
        result, 
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        code: 2,
        message: 'An error occurred while checking the balance.',
      },
      data: {
        result: false,
      },
    });
  }
});

/*const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});*/
module.exports = app;
/*module.exports = (req, res) => {
  res.status(200).json({ message: 'API is working' });
};*/
