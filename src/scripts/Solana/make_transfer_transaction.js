import * as buffer from "buffer";
import {
  Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL,
  sendAndConfirmTransaction, Connection, clusterApiUrl, PublicKey
} from '@solana/web3.js';

/**
 * Sends a transaction from one Solana wallet to another.
 * @param {string} sender_priv_key - The private key of the sender's wallet.
 * @param {string} receiver_pub_key - The public key of the receiver's wallet.
 * @param {number} amount - The amount of SOL (in SOL) to send.
 * @returns {Promise<void>} - A promise that resolves when the transaction is sent and confirmed.
 */
const send_transaction = async (sender_priv_key, receiver_pub_key, amount) => {
  // Setting the Buffer object to the global window object
  window.Buffer = buffer.Buffer;

  // Creating a new Connection instance using the clusterApiUrl for the testnet
  const connection = new Connection(clusterApiUrl("testnet"));
  
  // Converting the receiver's public key string to a PublicKey object
  const toPublicKey = new PublicKey(receiver_pub_key);

  // Converting the sender's private key string to a Uint8Array
  sender_priv_key = sender_priv_key.split(',').map(str => Number(str));
  let fromKeypair = Keypair.fromSecretKey(Uint8Array.from(sender_priv_key));

  // Creating a new Transaction instance
  let transaction = new Transaction();

  // Adding a transfer instruction to the transaction
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: toPublicKey,
      lamports: LAMPORTS_PER_SOL * amount,
    }),
  );

  // Sending and confirming the transaction using the Solana network
  await sendAndConfirmTransaction(connection, transaction, [fromKeypair]);
}

// Exporting the send_transaction function as the default export of the module
export default send_transaction;
