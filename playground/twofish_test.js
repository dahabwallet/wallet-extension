const twofish= require('twofish'); 
const pdk= require('pbkdf2')
const crypto_j= require('crypto-js')
const bytebuffer= require('bytebuffer')
const ba_converter= require("./test_ba_converter");
const argon2 = require("argon2");

 
 async function generateKeyFromPassword(password, length, hashing_algo){
  let salt=   crypto_j.lib.WordArray.random(length);
  console.log("salt: ", salt)
 
  let iterations = 1
  // let single_hash=   pdk.pbkdf2Sync(password, salt, iterations, length, 'sha512' );
  
  let single_hash= ""
  let double_hash= ""
  if (hashing_algo == "pbkdf2"){
    
    console.log ("performing pbkdf2 hashing")

    single_hash=   crypto_j.PBKDF2(password, salt, {iterations:iterations, keysize: length/32, hasher: crypto_j.algo.SHA512} );
    // console.log("single hash: ", single_hash)
    double_hash=   crypto_j.PBKDF2(single_hash, salt, iterations, length, 'sha512' );
    
  }
  
  else if (hashing_algo == "argon2"){
    
    console.log ("performing argon2 hashing")

    single_hash=   await argon2.hash(password, salt );
    // console.log("single hash: ", single_hash)
    double_hash=   await argon2.hash(single_hash, salt);
    
  }

  else {
    console.log ("hashing algo is not passed to the function parameters")
  }
  
  // var info= {"salt": salt, "single_hash": single_hash, "double_hash": double_hash}
  // console.log(`hashing_info: ${info}`)
  return [salt, single_hash, double_hash]

}



async function main(){

    console.log (`trying block bytes: ${bytebuffer.fromHex("0xe526c02cdc0a9f0a5f7346310942fafec8aae97ca47ae4a10e1fe4cdb7d53ad9")}`)
    console.log (`trying block bytes: ${bytebuffer.fromUTF8("0xe526c02cdc0a9f0a5f7346310942fafec8aae97ca47ae4a10e1fe4cdb7d53ad9")}`)


    console.log("hello from test two fish entry")

    let length= 256
    let pass= 'macoisnothing'

    let pbkdf2_hash="pbkdf2"
    let argon2_hash= "argon2"

    // this needs to return an object for a better design
    let hashing_info=  await generateKeyFromPassword(pass, length, hashing_algo=argon2_hash)
    let salt= hashing_info[0]
    console.log ("salt: ", salt)
    let salt_words= new Uint8Array(salt["words"])
    console.log ("salt words: ", salt_words)





    var twF = twofish.twofish(salt_words);
    let publicKey= "hellofromtheother12345"
    let publicKeyArray= ba_converter.stringToByteArray(publicKey) // This assumes that the public key has no 0x prefix

    let key_encfile = ba_converter.stringToByteArray(pass);    // this is k1 the one we will use to encrypt the file content




    let cipher_enc= twF.encryptCBC(key_encfile, publicKeyArray)
    console.log("hello from test_twofish")
    console.log("key_encfile: ", key_encfile)
    console.log("cipher: ", cipher_enc)


    let dec_bytes =  twF.decryptCBC(key_encfile, cipher_enc)
    let dec_str= ba_converter.byteArrayToString(new Uint32Array(dec_bytes))
    console.log("pubkeyarray: ", publicKeyArray)
    console.log ("decrypted_bytes: ", dec_bytes)
    console.log ("decrypted_str: ", dec_str)

}

(async ()=>{

  await main();
})();