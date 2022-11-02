import {
  CasperClient,
  CLPublicKey,
  mapOwnerKeys,
  DeployUtil,
  Keys
} from 'casper-js-sdk';
import { PAYMENT_AMOUNTS, CONNECTION } from "./CasperTransferParams";

export async function send_transaction_casper(
  senderPrivateKey,
  receiverPublicAddress,
  amount, //Amount
  // isSignerTransfer = false,
  ifHash = false,
) {
  const senderPublicKey = window.localStorage.getItem('CSPR_publicKey')
  const MOTE_RATE = 1000000000;
  const TTL = 1800000;

  const privateKey = Keys.Ed25519.parsePrivateKey(senderPrivateKey)
  const publicKey = Keys.Ed25519.privateToPublicKey(privateKey)
  const signKeyPair = Keys.Ed25519.parseKeyPair(publicKey, privateKey);

  console.log("==>", publicKey)

  const fromAccount = CLPublicKey.fromHex(senderPublicKey);
  console.log('=>', fromAccount)
  const toAccount = ifHash ? receiverPublicAddress : CLPublicKey.fromHex(receiverPublicAddress);
  amount = parseInt(amount) * MOTE_RATE;

  const PAYMENT_AMOUNT = PAYMENT_AMOUNTS.NATIVE_TRANSFER_PAYMENT_AMOUNT;
  const deployParams = new DeployUtil.DeployParams(
    signKeyPair.publicKey,
    'casper-test',
    TTL
  );

  const transferParams = DeployUtil.ExecutableDeployItem.newTransfer(
    amount,
    toAccount,
    null,
    1
  );

  const payment = DeployUtil.standardPayment(PAYMENT_AMOUNT);

  const deploy = DeployUtil.makeDeploy(deployParams, transferParams, payment);

  // DeployUtil.deployToJson(deploy);

  let signedDeployJson;

  // if (isSignerTransfer) {
  //   signedDeployJson = await Signer.sign(
  //     deployJson,
  //     senderPublicKey,
  //     receiverPublicAddress
  //   );

  //   signedDeployJson = DeployUtil.deployFromJson(signedDeployJson).unwrap();
  // } else {
  console.log(3.1)
  const client = new CasperClient(CONNECTION.NODE_ADDRESS);
  console.log(3.2)
  // const KEYS_USER = await mapOwnerKeys();
  // console.log(3.3)
  // console.log(KEYS_USER)
  console.log(3.4)
  // console.log("Here: ", privateKey, publicKey)

  console.log(signKeyPair)
  console.log(3.5)

  signedDeployJson = client.signDeploy(deploy, signKeyPair);
  // }
  console.log("here 4")
  const transferDeployHash = await signedDeployJson.send(
    CONNECTION.NODE_ADDRESS
  );

  console.log("here 5")

  return transferDeployHash;
}



export default send_transaction_casper
