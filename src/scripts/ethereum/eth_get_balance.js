import { ethers } from "ethers"

async function ethGetBalance(sender_priv_key) {

    let pub_key= window.localStorage.getItem('ETH_publicKey')
    let provider = new ethers.providers.getDefaultProvider("goerli")
    let wallet_balance= await provider.getBalance(pub_key)


    wallet_balance = ethers.utils.formatEther(wallet_balance)

    return wallet_balance

}

export default ethGetBalance


