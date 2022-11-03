import { getAccountBalance } from "./utils";

async function getBalance() {
    let balance = await getAccountBalance(window.localStorage.getItem('CSPR_publicKey'));
    return balance;
}


export default getBalance;
