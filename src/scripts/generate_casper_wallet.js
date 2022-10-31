const keyManager = KeyFactory.getInstance();

const masterKey = keyManager.generate();

const masterSeed = keyManager.toSeed(masterKey);
window.localStorage.setItem('mnemonic', masterSeed);

const masterSeedArray = keyManager.toSeedArray(masterKey)

const hdWallet = new CasperHDWallet(masterSeed, EncryptionType.Ed25519);

const acc0 = await hdWallet.getAccount(0)

const acc1 = await hdWallet.getAccount(1)

const privateKey = acc0.getPrivateKey();
window.localStorage.setItem("private_key", privateKey);

const rawPublicKey = await acc0.getRawPublicKey();

const publicKey = await acc0.getPublicKey();

const publicAddress = await acc0.getPublicAddress();

