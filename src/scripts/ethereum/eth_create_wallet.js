import store_keypair from "../store_keypair";
import { ethers } from "ethers"

const create_wallet = () => {
	const key_pair = ethers.Wallet.createRandom()._signingKey();
	store_keypair("ETH", key_pair.publicKey, key_pair.privateKey)
}

export default create_wallet
