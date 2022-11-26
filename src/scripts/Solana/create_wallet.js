import store_keypair from "../store_keypair";
import * as solanaWeb3 from '@solana/web3.js';

const create_wallet = (master_seed) => {
	let keypair = solanaWeb3.Keypair.fromseed(master_seed);
	let privateKey = keypair.secretKey.toString();
	let publicKey = keypair.publicKey.toString()
	store_keypair("SOL", publicKey, privateKey);
}

export default create_wallet
