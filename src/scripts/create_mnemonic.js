import "bip39";

function create_mnemonics(){

    var bip39 = require('bip39')
    const mnemonic1 = bip39.generateMnemonic()
    const mnemonic2 = bip39.generateMnemonic()
    const mnemonic = mnemonic1+mnemonic2;
    return(mnemonic)

}

export default create_mnemonics;