import store_keypair from "../store_keypair";
import { ethers } from "ethers"

const create_wallet = (master_mnemonic) => {
	const wallet = ethers.Wallet.fromMnemonic(master_mnemonic);
	const privateKey = wallet._signingKey().privateKey;
	const publicKey = wallet.address;
	store_keypair("ETH", publicKey, privateKey)
}

//Correct Address: 0xb794f5ea0ba39494ce839613fffba74279579268
//Compressed:      0x02213b6cabbbfb2652e402bf04bb2af55b5df6b66b44d8a94424fa071aaeaf7055
//Long:            0x04213b6cabbbfb2652e402bf04bb2af55b5df6b66b44d8a94424fa071aaeaf70554461beb85dc0da3851c167659f4af87796c9200b9dbff2afe5f3493a827a860a
//Priv:           0xcf31305092ee68c4f09533f1e36e11858ebe46735d552e37f1106ee71892162d
//Address:			   0x707d27FE2AC25a65aFFb691C74d3eAC776163b53

export default create_wallet
