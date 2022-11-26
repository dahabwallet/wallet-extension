const bip39 = require("bip39");

function create_seed(master_mnemonic){

    let buffer = bip39.mnemonicToSeed(master_mnemonic)
    let seed = new Uint8Array(buffer.toJSON().data.slice(0,32))
    return seed
    //const key = Keypair.fromSeed(a);


}

export default create_seed;