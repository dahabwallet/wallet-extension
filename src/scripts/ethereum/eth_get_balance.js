import { ethers } from "ethers"

async function ethGetBalance(sender_priv_key) {
    let provider = new ethers.providers.getDefaultProvider("goerli")
    let walletPrivKey = new ethers.Wallet(sender_priv_key)

    const wallet = walletPrivKey.connect(provider)
    let wallet_balance = await wallet.getBalance()
    wallet_balance = ethers.utils.formatEther(wallet_balance)

    return wallet_balance

}

export default ethGetBalance


