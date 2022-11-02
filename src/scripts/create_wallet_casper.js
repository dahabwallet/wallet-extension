import { KeyFactory, EncryptionType, CasperHDWallet } from "casper-storage";
import store_keypair_casper from "./store_keypair_casper";

/*
    const KeyFactory = require('casper-storage');
    const EncryptionType = require('casper-storage');
    const CasperHDWallet = require('casper-storage');
*/

async function create_wallet_casper() {
    const keyManager = KeyFactory.getInstance();

    const masterKey = keyManager.generate();

    const masterSeed = keyManager.toSeed(masterKey);
    window.localStorage.setItem('mnemonic', masterSeed);

    console.log(`Master Seed: ${masterSeed}`);

    const masterSeedArray = keyManager.toSeedArray(masterKey)

    const hdWallet = new CasperHDWallet(masterSeed, EncryptionType.Ed25519);

    const acc0 = await hdWallet.getAccount(0);

    const acc1 = await hdWallet.getAccount(1);

    const privateKey = acc0.getPrivateKey();

    window.localStorage.setItem("private_key_cspr", privateKey);

    console.log(`privateKey: ${privateKey}`);

    const rawPublicKey = await acc0.getRawPublicKey();

    const publicKey = await acc0.getPublicKey();

    const publicAddress = await acc0.getPublicAddress();
    window.localStorage.setItem("public_key_cspr", privateKey);

    store_keypair_casper("CSPR", publicKey, privateKey);
}

export default create_wallet_casper;