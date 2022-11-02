import { ethers } from "ethers"

async function send_transaction(sender_priv_key, receiver_pub_key, amount){
    
    // console.log("omar: ", sender_priv_key)
    console.log("sender private key: ", sender_priv_key)
    console.log("receiver addr: ", receiver_pub_key)
    console.log("amount: ", amount)
    let provider= new ethers.providers.getDefaultProvider("goerli")

   let  walletPrivKey= new ethers.Wallet(sender_priv_key)

    let tx = {
        to: receiver_pub_key,
        value: ethers.utils.parseEther(amount)
    }

    const wallet = walletPrivKey.connect(provider)


      await walletPrivKey.signTransaction(tx)
      let result = await wallet.sendTransaction(tx)


    return result

}

export default send_transaction


