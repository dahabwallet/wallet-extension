import { mnemonicToSeedSync } from "bip39";

async function create_seed(master_mnemonic) {
    let buffer = await mnemonicToSeedSync(master_mnemonic)
    let seed = new Uint8Array(buffer.toJSON().data.slice(0, 32))
    console.log(`returned seed: ${seed}`);
    return seed

    //const key = Keypair.fromSeed(a);


}

export default create_seed;
