import { KeyFactory, EncryptionType, CasperHDWallet } from "casper-storage";
import store_keypair from "../store_keypair";

async function create_wallet_casper() {
    const keyManager = KeyFactory.getInstance();
    const masterKey = keyManager.generate();
    const masterSeed = keyManager.toSeed(masterKey);

    const hdWallet = new CasperHDWallet(masterSeed, EncryptionType.Ed25519);

    const acc0 = await hdWallet.getAccount(0);

    const privateKey = await acc0.getPrivateKey();
    const publicKey = await acc0.getPublicKey();

    store_keypair("CSPR", publicKey, privateKey);
}

export default create_wallet_casper;
