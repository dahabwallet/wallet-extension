import  { lib,PBKDF2, algo} from 'crypto-js'
import {twofish} from 'twofish'
import { pbkdf2 } from 'pbkdf2'
import {byteArrayToString,stringToByteArray} from './test_ba_converter'
// import {hash} from 'argon2-browser'
// import {hash} from '../../node_modules/argon2-browser/lib/argon2'
// const argon2= require('../../node_modules/argon2-browser/lib/argon2') 


async function generateKeyFromPassword(password, length, hashing_algo){
  let salt=   lib.WordArray.random(length);
  console.log("salt: ", salt)
  

  let iterations = 1
  // let single_hash=   pdk.pbkdf2Sync(password, salt, iterations, length, 'sha512' );
  
  let single_hash= ""
  let double_hash= ""
  if (hashing_algo == "pbkdf2"){
    
    console.log ("performing pbkdf2 hashing")

    single_hash=   PBKDF2(password, salt, {iterations:iterations, keysize: length/32, hasher: algo.SHA512} );
    // console.log("single hash: ", single_hash)
    double_hash=   PBKDF2(single_hash, salt, iterations, length, 'sha512' );
    
  }
  
  else if (hashing_algo == "argon2"){
    
    console.log ("performing argon2 hashing")

    // single_hash=   await hash(password, salt );
    // // console.log("single hash: ", single_hash)
    // double_hash=   await hash(single_hash, salt);
    
  }

  else {
    console.log ("hashing algo is not passed to the function parameters")
  }
  
  // var info= {"salt": salt, "single_hash": single_hash, "double_hash": double_hash}
  // console.log(`hashing_info: ${info}`)
  return [salt, single_hash, double_hash]

}



export async function two_fish_main(hashing_algo){

    

    console.log("hello from test two fish entry")

    let length= 256
    let pass= 'macoisnothing'

    

    // this needs to return an object for a better design
    let hashing_info=  await generateKeyFromPassword(pass, length, hashing_algo=hashing_algo)
    let salt= hashing_info[0]
    console.log ("salt: ", salt)
    let salt_words= new Uint8Array(salt["words"])
    console.log ("salt words: ", salt_words)





    var twF = twofish(salt_words);
    let publicKey= "hellofromtheother12345"
    let publicKeyArray= stringToByteArray(publicKey) // This assumes that the public key has no 0x prefix

    let key_encfile = stringToByteArray(pass);    // this is k1 the one we will use to encrypt the file content




    let cipher_enc= twF.encryptCBC(key_encfile, publicKeyArray)
    console.log("hello from test_twofish")
    console.log("key_encfile: ", key_encfile)
    console.log("cipher: ", cipher_enc)


    let dec_bytes =  twF.decryptCBC(key_encfile, cipher_enc)
    let dec_str= byteArrayToString(new Uint32Array(dec_bytes))
    console.log("pubkeyarray: ", publicKeyArray)
    console.log ("decrypted_bytes: ", dec_bytes)
    console.log ("decrypted_str: ", dec_str)

}
