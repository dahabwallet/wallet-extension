import { ethers } from "ethers"
import { POSClient, use } from "@maticnetwork/maticjs"
import HDWalletProvider from "@truffle/hdwallet-provider"

const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");
const getPolygonMaticBalance = async (sender_priv_key) => {

  const dic_net = {
    name: 'Mumbai Testnet',
    chainId: 80001,
    _defaultProvider: (providers) => new providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/')
  };

  let provider = new ethers.providers.getDefaultProvider(dic_net)
  let walletPrivKey = new ethers.Wallet(sender_priv_key)

  const wallet = walletPrivKey.connect(provider)
  let wallet_balance = await wallet.getBalance()
  wallet_balance = ethers.utils.formatEther(wallet_balance)

  //eth
  //private: 0xfc0388a0c757ca1e52566ad96e4e665b5689c926a1633eb6018b44747cbfb1b7
  //public: 0xaA6b9a0225c8BB5f51f1d88d3b422f4fE0D85eA5
  //matic: polygon
  //private: 0xe8752f6e5611749bcf78d6e862210d2b58a852081fe129e46c164312c39ee9b9
  //public: 0x4fA8959EB0aAAdb87D828111056474dCaD9E518A

  return wallet_balance
}

const getPolygonWethBalance = async (privateKey, publicKey) => {

  use(Web3ClientPlugin);
  const posClient = new POSClient();

  await posClient.init({
    network: "testnet",  // 'testnet' or 'mainnet'
    version: "mumbai", // 'mumbai' or 'v1'
    parent: {
      provider: new HDWalletProvider(
        privateKey,
        'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
      ),
      defaultConfig: {
        from: publicKey
      }
    },
    child: {
      provider: new HDWalletProvider(
        privateKey,
        'https://rpc-mumbai.maticvigil.com'
      ),
      defaultConfig: {
        from: publicKey
      }
    }
  });

  const erc20Token = posClient.erc20("0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa");//weth's token on mumbai
  const wallet_balance = await erc20Token.getBalance(publicKey);

  return wallet_balance / 1000000000000000000
}

export { getPolygonMaticBalance, getPolygonWethBalance }
