import { generateMnemonic } from "bip39";

function create_mnemonics() {

    const mnemonic1 = generateMnemonic()
    const mnemonic2 = generateMnemonic()
    const mnemonic = mnemonic1 + mnemonic2;
    return (mnemonic1)

}

export default create_mnemonics;
