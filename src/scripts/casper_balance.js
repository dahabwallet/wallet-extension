import { getAccountBalance } from "./utilities/utils";

async function getBalance() {
    console.log("pub key bef bal ", window.localStorage.getItem('CSPR_publicKey'));
    let balance = await getAccountBalance(window.localStorage.getItem('CSPR_publicKey'));
    console.log(`balance: ${balance}`);
}


export default getBalance;
