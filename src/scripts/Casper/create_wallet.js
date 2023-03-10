import { CasperClient } from 'casper-js-sdk';
import { CONNECTION } from "./CasperTransferParams";
import store_keypair from "../store_keypair";
import privKeyTypeEnum from "../private_key_format"
import { Buffer } from 'buffer'

async function create_wallet_casper(master_seed, password, length) {
    const client = new CasperClient(CONNECTION.NODE_ADDRESS);
    const edKeyPair = client.newHdWallet(master_seed);

    const publicKey = Buffer.from(edKeyPair.publicKey()).toString('hex');
    const privateKey = edKeyPair.privateKey();

    store_keypair("CSPR", publicKey, privateKey.toString(),
        length, password, privKeyTypeEnum.ByteArray);
}

export default create_wallet_casper;
