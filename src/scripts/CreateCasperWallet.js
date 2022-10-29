/*const { casper.CasperClient, casper.decodeBase16 } = "casper-js-sdk";
var casper.CasperClient = require('casper-j-sdk');
var casper.decodeBase16 = require('casper-j-sdk');
*/
/*
	
	//No sign
*/ 
import CasperClient from "casper-js-sdk";
import decodeBase16 from "casper-js-sdk";

//const casper = require('casper-js-sdk')

//import { Buffer } from 'buffer';

const SignatureAlgorithm = {
		Ed25519 : 'ed25519',
		Secp256K1 : 'secp256K1'
}

 function create_wallet(){
	console.log("Wallet Managment System Started!");
	
	const casperClient = new CasperClient("http://44.240.166.110:29853/rpc");
	const network = 'casper-test';
	const edKeyPair = casperClient.newKeyPair(SignatureAlgorithm.Ed25519);
	const publicKeyInPem = edKeyPair.exportPublicKeyInPem();
	const privateKeyInPem = edKeyPair.exportPrivateKeyInPem();
	console.log(publicKeyInPem);
	console.log(privateKeyInPem);
	/*
	const a = document.createElement('a');
	const blob = new Blob([JSON.stringify(publicKeyInPem)]);
	a.href = URL.createObjectURL(blob);
	a.download = 'username-public.pem';                     
	a.click();

	const b = document.createElement('a');
	const blob2 = new Blob([JSON.stringify(privateKeyInPem)]);
	b.href = URL.createObjectURL(blob2);
	b.download = 'username-private.pem';                     
	b.click();
	*/
	const seed = 'fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542';
	const hdKey = casperClient.newHdWallet(decodeBase16(seed));
	  const secpKey1 = hdKey.deriveIndex(1);
	const msg = Buffer.from('hello world');
	const signature = secpKey1.sign(msg);
	const secpKey2 = hdKey.deriveIndex(2);
	const signature2 = secpKey2.sign(msg);
	const json = JSON.parse(
					'{"deploy":{"hash":"510d968d880a89cb92b985578312a535ea1412aaa6cb4a514456135d415b32f5","header":{"account":"0109791772400ea911e2adcb7569d805da75654fc1360c06f93832f020e13aa0cf","timestamp":"2022-04-03T19:18:42.176Z","ttl":"30m","gas_price":1,"body_hash":"ea0a6bc12489f4ccf0b7564bcacd2918b744b9e4b8cad71d52afd9159f33b108","dependencies":[],"chain_name":"casper-test"},"payment":{"ModuleBytes":{"module_bytes":"","args":[["amount",{"bytes":"0500e40b5402","cl_type":"U512"}]]}},"session":{"Transfer":{"args":[["amount",{"bytes":"0500ba1dd205","cl_type":"U512"}],["target",{"bytes":"01861759c3e71b1953f2be3a92c406a3423fd36ea6a8ff6fd0e71bb39685d68893","cl_type":"PublicKey"}],["id",{"bytes":"01addd020000000000","cl_type":{"Option":"U64"}}]]}},"approvals":[]}}'
				);
	const validSignatures = [
					JSON.parse(
						'[{"signer":"02032ecf3a29fda8bf82af344c586f277867ad870e7d7b56510e52b425bfb6318264","signature":"0288734bc562139b989991cdb2ceb8840b12d42a7e7ada9c1247737eaa2268543c02cae5c00da8316821ac978c2d423a270464f79337f5b54f077b1773a3748e70"}]'
											),
					JSON.parse(
						'[{"signer":"0109791772400ea911e2adcb7569d805da75654fc1360c06f93832f020e13aa0cf","signature":"019b58c52752df47a42590d08de3f994e6e85877469abb5ace25adc53adf1f4dd6e071fcdc9db575451afe41f3d47ebdae8434467ab2c70e10c3eebd70bc4e3204"}]'
											)
					];	
	validSignatures.forEach(approvals => {
					const validDeploy = casperClient
						.deployFromJson({ ...json, deploy: { ...json.deploy, approvals } })
						.unwrap();

					});

	console.log("JSON TTL: ", casperClient.deployFromJson(json).unwrap().header.ttl);
					
	this.store_keypair(publicKeyInPem, privateKeyInPem);
	
}

async function store_keypair(publicKeyInPem, privateKeyInPem){			
	try {
		window.localStorage.setItem('publicKey', publicKeyInPem);
		window.localStorage.setItem('privateKey', privateKeyInPem);
		window.localStorage.getItem('publicKey');
		window.localStorage.getItem('privateKey');
		return true;
	} catch (err) {
		console.error(`Error while creating secret in secretsManager: ${JSON.stringify(err)}`);
		console.log(err);	
		return false;
}
}	

create_wallet();