import { getAccountBalance } from "./utils";
import create_wallet_casper from "./create_wallet";

async function getBalance(public_key) {
    console.log (`casper_public_key: ${public_key}`)
    console.log (`casper hello from get_balance `)
    // const seed= "8c46e691960cb6f7cf920a16cefeda9d8534329f4f26a8b5cb6012f6eb8269ff10509ef5cebe0d626d53c02eadca1cddf5bf93f002077f17739fb1ed60ea5781"
    // const paswd= "hellothere"
    // create_wallet_casper(seed, paswd, 128);
    let balance = await getAccountBalance(public_key);
    console.log (`casper balance from get_balance: ${balance}`)
    return balance;
}


export default getBalance;
