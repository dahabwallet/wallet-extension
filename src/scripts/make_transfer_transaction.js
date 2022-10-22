import { ethers } from "ethers"

async function send_transaction(sender_priv_key, receiver_pub_key, amount){
    
    let provider= new ethers.providers.getDefaultProvider("goerli")

   let  walletPrivKey= new ethers.Wallet(sender_priv_key)

    let tx = {
        to: receiver_pub_key,
        value: ethers.utils.parseEther(amount)
    }

    const wallet = walletPrivKey.connect(provider)
    
    let  balance=  await wallet.getBalance();
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


