// const ethers= require('ethers')
// import * from 'ethers' 
import { ethers } from "ethers"

async function send_transaction(sender_priv_key, receiver_pub_key, amount){
    
    // mnemonic = "soap sing employ swallow sting sweet praise subway address window agree remind"

    // provider= new ethers.providers.getDefaultProvider()
    let provider= new ethers.providers.getDefaultProvider("goerli")

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
//    provider=   new ethers.providers.WebSocketProvider()



    // walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic)
   let  walletPrivKey= new ethers.Wallet(sender_priv_key)

    let tx = {
        to: receiver_pub_key,
        value: ethers.utils.parseEther(amount)
    }

    const wallet = walletPrivKey.connect(provider)
    let  balance=  await wallet.getBalance();
    // const balance = await provider.getBalance(walletPrivKey.address)

     balance= ethers.utils.formatEther(balance)
    let tx_num= await wallet.getTransactionCount();
    console.log(balance, tx_num)

      await walletPrivKey.signTransaction(tx)
      let result = await wallet.sendTransaction(tx)




    console.log(walletPrivKey.address)
    console.log (result)
    return result

}

export default send_transaction

// sender_priv_key= "a4295385c67787a34e49c4ead739b0d13da7650d84501100f3c4c5b6c89e59c3"
// receiver_pub_key= "0x313907De9f0F4722E4aE9de2b54E456CbB2a4929"
// amount= "0.002"
// send_transaction(sender_priv_key, receiver_pub_key, amount)

