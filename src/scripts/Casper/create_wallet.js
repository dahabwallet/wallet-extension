import { Keys } from 'casper-js-sdk';

import store_keypair from "../store_keypair";

async function create_wallet_casper() {
    const edKeyPair = Keys.Ed25519.new();
    const { publicKey, privateKey } = edKeyPair;
    // console.log(publicKey.toHex())
    store_keypair("CSPR", publicKey.toHex(), privateKey.toString());
}

export default create_wallet_casper;
