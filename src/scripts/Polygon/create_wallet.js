import store_keypair from "../store_keypair";
import { ethers } from "ethers"

const create_wallet = () => {
	//Uses the same keys as Ethereum 
	const privateKey = window.localStorage.getItem('ETH_privateKey');
	const publicKey = window.localStorage.getItem('ETH_publicKey');
	store_keypair("MATIC", publicKey, privateKey)
}

export default create_wallet
