import { PublicKey, Connection, clusterApiUrl } from '@solana/web3.js';

/**
 * Retrieves the balance of a Solana wallet address.
 * @param {string} publicKey - The public key of the wallet address.
 * @returns {Promise<number>} - A promise that resolves to the balance of the wallet address.
 */
const get_balance = async (publicKey) => {
  // Creating a new Connection instance using the clusterApiUrl for the testnet
  let connection = new Connection(clusterApiUrl("testnet"));

  // Converting the provided publicKey string to a PublicKey object
  publicKey = new PublicKey(publicKey);

  // Retrieving the balance of the wallet address from the Solana network
  let balance = await connection.getBalance(publicKey);

  // Returning the balance
  return balance;
}

// Exporting the get_balance function as the default export of the module
export default get_balance;
