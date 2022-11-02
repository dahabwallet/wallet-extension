import { KeyFactory, EncryptionType, CasperHDWallet } from "casper-storage";
import CryptoJS from "crypto-js";

import {
  CasperClient,
  CLPublicKey,
  CLURef,
  Keys,
  CasperServiceByJsonRPC,
  DeployUtil,
  Signer,
  CLValueBuilder,
} from "casper-js-sdk";

import {
  PAYMENT_AMOUNTS,
  PROFILE_PACKAGE_HASH,
  PROFILE_CONTRACT_HASH,
  NFT_PACKAGE_HASH,
  NFT_CONTRACT_HASH,
  KEYS,
  CONNECTION,
  TREASURY_WALLET,
  DEPLOYER_ACC,
  USER_KEY_PAIR_PATH,
  NODE_RPC_ADDRESS,
  NFT_STORAGE_KEY,
  proxyServer,
} from "./CasperTransferParams";


function hex2a(hexx) {
  var hex = hexx.toString();
  var str = "";
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

async function mapOwnerKeys() {
  let cipher = window.localStorage.getItem("CSPR_privateKey");
  console.log(`cipher ${cipher}`);

  let key = "DahabIsTheSecretKey";
  let decipher = CryptoJS.AES.decrypt(cipher, key);
  decipher = decipher.toString(CryptoJS.enc.Utf8);
  console.log(`decipher ${decipher}`);

  let private_key_ascii = hex2a(cipher); // returns '2460'
  console.log(`private_key_ascii ${private_key_ascii}`);

  
  //btoa: convert ascii to pem (base64)
  let private_key_pem = btoa(private_key_ascii);
  console.log(`private key pem: ${private_key_pem}`);
  const privateKey = Keys.Ed25519.parsePrivateKey(
    Keys.Ed25519.readBase64WithPEM(private_key_pem)
  );
  const publicKey = Keys.Ed25519.privateToPublicKey(privateKey);
  const mappedKeys = Keys.Ed25519.parseKeyPair(publicKey, privateKey);

  return mappedKeys;
}



export async function send_transaction(
    selectedAddress,
    toAddress,
    amount,
    isSignerTransfer,
    ifHash,
  ) {
    console.log(`Transfer Transacction started`);
    const MOTE_RATE = 1000000000;
  
    const fromAccount = CLPublicKey.fromHex(selectedAddress);
    const toAccount = ifHash ? toAddress : CLPublicKey.fromHex(toAddress);
    amount = parseInt(amount) * MOTE_RATE;
    const ttl = 1800000;
  
    const PAYMENT_AMOUNT = PAYMENT_AMOUNTS.NATIVE_TRANSFER_PAYMENT_AMOUNT;
    const deployParams = new DeployUtil.DeployParams(
      fromAccount,
      CONNECTION.CHAIN_NAME,
      ttl
    );
  
    const transferParams = DeployUtil.ExecutableDeployItem.newTransfer(
      amount,
      toAccount,
      null,
      1
    );
  
    const payment = DeployUtil.standardPayment(PAYMENT_AMOUNT);
  
    const deploy = DeployUtil.makeDeploy(deployParams, transferParams, payment);
  
    const deployJson = DeployUtil.deployToJson(deploy);
  
    let signedDeployJson;
  
    if (isSignerTransfer) {
      signedDeployJson = await Signer.sign(
        deployJson,
        selectedAddress,
        toAddress
      );
  
      signedDeployJson = DeployUtil.deployFromJson(signedDeployJson).unwrap();
    } else {
      const client = new CasperClient(CONNECTION.NODE_ADDRESS);
      const KEYS_USER = await mapOwnerKeys();
      signedDeployJson = client.signDeploy(deploy, KEYS_USER);
    }
    const transferDeployHash = await signedDeployJson.send(
      CONNECTION.NODE_ADDRESS
    );
  
  
    return transferDeployHash;
  }



export default send_transaction


