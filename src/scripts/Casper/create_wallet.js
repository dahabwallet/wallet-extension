import { Keys } from 'casper-js-sdk';

import store_keypair from "../store_keypair";
import privKeyTypeEnum from "../private_key_format"

async function create_wallet_casper(length,password) {
    const edKeyPair = Keys.Ed25519.new();
    const { publicKey, privateKey } = edKeyPair;

    store_keypair("CSPR", publicKey.toHex(), privateKey.toString(),length, password, privKeyTypeEnum.ByteArray);
}

export default create_wallet_casper;
