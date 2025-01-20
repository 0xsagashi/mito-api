const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Import des routes
const gasBalanceRoutes = require('./routes/gasBalanceRoutes');

// Utilisation des routes
app.use('/api', gasBalanceRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`API started on http://localhost:${PORT}`);
});
