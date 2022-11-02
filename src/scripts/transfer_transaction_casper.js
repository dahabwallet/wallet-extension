export async function send_transaction_casper(
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



export default send_transaction_casper