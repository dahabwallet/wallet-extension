import store_keypair from "../store_keypair";
import { ethers } from "ethers"

const create_wallet = () => {
	const wallet = ethers.Wallet.createRandom();
	const privateKey = wallet._signingKey().privateKey;
	const publicKey = wallet.address;
	store_keypair("MATIC", publicKey, privateKey)
}

export default create_wallet
