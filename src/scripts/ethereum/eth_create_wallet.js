import store_keypair from "../store_keypair";
import { ethers } from "ethers"

const create_wallet = (master_mnemonic) => {
	const wallet = ethers.Wallet.fromMnemonic(master_mnemonic);
	const privateKey = wallet._signingKey().privateKey;
	const publicKey = wallet.address;
	store_keypair("ETH", publicKey, privateKey)
}

export default create_wallet
