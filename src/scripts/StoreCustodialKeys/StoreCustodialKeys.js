import AWS from 'aws-sdk';


function getSecretIDForKey(keyName) {
    return 'dev/wms/' + keyName;
  }


async function store_custodial_keys(keyName, publicKey, privateKey) {
    console.log("Authenticate to AWS using credentials");
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION
    });

    console.log("Storing the keys in AWS secret");
    var client = new AWS.SecretsManager({
      region: process.env.REACT_APP_AWS_REGION,
    });

    try {
      const smResult = await client.createSecret({
        Name: getSecretIDForKey(keyName),
        SecretString: JSON.stringify({ [publicKey]: privateKey, }),
      }).promise();

    } catch (err) {
      console.error(`Error while creating secret in secretsManager: ${JSON.stringify(err)}`);
      console.log(err);
    }
}


export default store_custodial_keys;
