import {
  CasperClient,
  CLPublicKey,
  DeployUtil,
  Keys
} from 'casper-js-sdk';
import { PAYMENT_AMOUNTS, CONNECTION } from "./CasperTransferParams";
import { Buffer } from 'buffer'

const send_transaction_casper = async (
  senderPrivateKey,
  receiverPublicAddress,
  amount
) => {

  senderPrivateKey = new Uint8Array(Buffer.from(senderPrivateKey.split(',')))

  const MOTE_RATE = 1000000000;
  const TTL = 1800000;

  const privateKey = Keys.Ed25519.parsePrivateKey(senderPrivateKey)
  const publicKey = Keys.Ed25519.privateToPublicKey(senderPrivateKey)
  const signKeyPair = Keys.Ed25519.parseKeyPair(publicKey, privateKey);

  const toAccount = CLPublicKey.fromHex(receiverPublicAddress);
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
  const client = new CasperClient(CONNECTION.NODE_ADDRESS);


  let signedDeployJson = client.signDeploy(deploy, signKeyPair);
  const transferDeployHash = await signedDeployJson.send(
    CONNECTION.NODE_ADDRESS
  );


  return transferDeployHash;
}


export default send_transaction_casper
