import HighLight from "../Entities/HighLight";
import { casperSigner } from "../../../component/layout/header";
import CryptoJS from "crypto-js";
import { KeyFactory, EncryptionType, CasperHDWallet } from "casper-storage"
import { getAccountBalance } from '../../utils/contract-utils';
import { nativeTransfer } from "../../pages/Game/Utilities/Scene2Utilities";

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
} from "../Payment/TicketPayment";

export async function nativeTransfer(
    selectedAddress,
    toAddress,
    amount,
    isSignerTransfer,
    ifHash,
  ) {
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