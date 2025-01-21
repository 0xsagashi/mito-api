const axios = require('axios');
const BASE_URL = 'https://api.routescan.io/v2/network';

/**
 * 
 * @param {string} address
 * @returns {string} balance
 */
async function getGasBalance(address) {
  try {
    const url = `${BASE_URL}/testnet/evm/124832/address/${address}/gas-balance`;
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

async function isMitoBalance100(address) {
  try {
    const url = `${BASE_URL}/testnet/evm/124832/address/${address}/gas-balance`;
    const response = await axios.get(url);

    if (response.data?.items?.length > 0) {
      const balance = BigInt(response.data.items[0].balance); 
      const threshold = BigInt(100000000000000000000); 
      // 100000000000000000000 = 100

      return balance > threshold;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Routescan request error:', error.response?.data || error.message);
    return false; 
  }
}


module.exports = { getGasBalance, isMitoBalance100 };
