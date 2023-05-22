// Importing the required modules
import store_keypair from "../store_keypair";
import * as solanaWeb3 from '@solana/web3.js';

/**
 * Generates a Solana wallet keypair and stores it.
 * The generated keypair consists of a public key and a private key.
 * The keypair is stored using the store_keypair function.
 * @returns {void}
 */
const create_wallet = () => {
    // Generating a new keypair using the Solana Keypair class
    let keypair = solanaWeb3.Keypair.generate();

    // Converting the private and public keys to strings
    let privateKey = keypair.secretKey.toString();
    let publicKey = keypair.publicKey.toString();

    // Storing the keypair using the store_keypair function
    store_keypair("SOL", publicKey, privateKey);
}

// Exporting the create_wallet function as the default export of the module
export default create_wallet;
