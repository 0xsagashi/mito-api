const axios = require('axios');
const BASE_URL = 'https://api.routescan.io/v2/network';

/**
 * 
 * @param {string} networkId
 * @param {string} chainId
 * @param {string} address
 * @returns {string} balance
 */
async function getGasBalance(networkId, chainId, address) {
  try {
    const url = `${BASE_URL}/${networkId}/evm/${chainId}/address/${address}/gas-balance`;
    const response = await axios.get(url);

    // Verif avant d'extraire
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
