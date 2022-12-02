import { CasperClient } from 'casper-js-sdk';
import store_keypair from "../store_keypair";

async function create_wallet_casper(master_seed) {
    //const edKeyPair = Keys.Ed25519.new();
    const edKeyPair = CasperClient.newHdWallet(decodeBase16(master_seed));
    const { publicKey, privateKey } = edKeyPair;

    store_keypair("CSPR", publicKey.toHex(), privateKey.toString());
}

export default create_wallet_casper;
