import { ethers } from "ethers"

async function getBalance(sender_priv_key) {

  const dic_net = {
    name: 'matic',
    chainId: 80001,
    _defaultProvider: (providers) => new providers.JsonRpcProvider('https://rpc-mumbai.matic.today/')
  };

  let provider = new ethers.providers.getDefaultProvider(dic_net)
  let walletPrivKey = new ethers.Wallet(sender_priv_key)

  const wallet = walletPrivKey.connect(provider)
  let wallet_balance = await wallet.getBalance()
  wallet_balance = ethers.utils.formatEther(wallet_balance)

  return wallet_balance
}

export default getBalance


