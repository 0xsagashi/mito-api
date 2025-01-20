const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const gasBalanceRoutes = require('../routes/gasBalanceRoutes');

app.use('/api', gasBalanceRoutes);

app.listen(PORT, () => {
  console.log(`API started on ${PORT}`);
});
