import { getAccountBalance } from "./utils";

async function getBalance(public_key) {
    console.log (`casper hello from get_balance `)
    let balance = await getAccountBalance(public_key);
    console.log (`casper balance from get_balance: ${balance}`)
    return balance;
}


export default getBalance;
