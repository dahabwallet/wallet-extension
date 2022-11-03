import { PublicKey, Connection, clusterApiUrl } from '@solana/web3.js';

const get_balance = async (publicKey) => {
  let connection = new Connection(clusterApiUrl("testnet"));

  publicKey = new PublicKey(publicKey);
  let balance = await connection.getBalance(publicKey);
  return balance
}

export default get_balance
