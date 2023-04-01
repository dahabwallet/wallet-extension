import { CasperClient } from 'casper-js-sdk';
import { CONNECTION } from "./CasperTransferParams";
import store_keypair from "../store_keypair";
import privKeyTypeEnum from "../private_key_format"
import { Buffer } from 'buffer'


import { KeyFactory, EncryptionType, CasperHDWallet } from "casper-storage"


async function create_wallet_casper(master_seed, password, length) {

    // const client = new CasperClient(CONNECTION.NODE_ADDRESS);
    // const edKeyPair = client.newHdWallet(master_seed);


    const hdWallet = new CasperHDWallet(master_seed);
    const acc0 = await hdWallet.getAccount(0)
    const privateKey= acc0.getPrivateKey()
    const publicKey= await acc0.getPublicKey()
    // window.localStorage.setItem(`YYYYYYPUBKEY`, y_pub); 721
    // window.localStorage.setItem(`YYYYYPrivKEY`, y_priv);




    // const publicKey = Buffer.from(edKeyPair.publicKey()).toString('hex');
    // let publicKey = edKeyPair.publicKey().toString('hex');
    // publicKey[1]=1;

    // const privateKey = edKeyPair.privateKey();
    // window.localStorage.setItem(`casper_edpubKey`, edKeyPair.publicKey());
    // window.localStorage.setItem(`casper_Buffer.from`, Buffer.from(edKeyPair.publicKey()));
    
    // window.localStorage.setItem(`PUBKEY`, publicKey);
    // window.localStorage.setItem(`PRIVKEY`, privateKey);


    
    store_keypair("CSPR", publicKey, privateKey,
        length, password, privKeyTypeEnum.ByteArray);

}

export default create_wallet_casper;
