const axios = require('axios');
const BASE_URL = 'https://api.routescan.io/v2/network';

/**
 * Fonction pour récupérer le solde de gas d'une adresse.
 * @param {string} networkId
 * @param {string} chainId
 * @param {string} address
 * @returns {string} balance
 */
async function getGasBalance(networkId, chainId, address) {
  try {
    const url = `${BASE_URL}/${networkId}/evm/${chainId}/address/${address}/gas-balance`;
    const response = await axios.get(url);

    // Vérifie la réponse pour extraire le solde
    if (response.data?.items?.length > 0) {
      const balance = response.data.items[0].balance;
      return balance;
    } else {
      throw new Error('No balance found for this address.');
    }
  } catch (error) {
    console.error('Routescan request error:', error.response?.data || error.message);
    throw new Error('Impossible to retrieve the gas balance.');
  }
}

module.exports = { getGasBalance };
