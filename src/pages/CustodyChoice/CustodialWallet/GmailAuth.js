import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';

const clientId = "403948246807-h26rs9bf1cbot8cn9gs16hsb6jmq3fph.apps.googleusercontent.com"; //localhost
//const clientId ="401086831079-nvaessiq7n1oc3ir8t2m85q4i6kvv01r.apps.googleusercontent.com"; //server

const localhostIdentityPool = "us-east-1:6b4f38dd-f564-4132-a5cd-41d1e853bbee";
const productionIdentityPool = "us-east-1:2eb8c8a3-2755-4930-944b-664366bd5f31";

const GMAIL_WALLET = "gmail";
const TAIL = "dahabwallet/";

function GmailAuth(props) {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);


  var [email, setemail] = useState("");

  /**
   * This function is called when a gmail user is authenticated successfully
   * @param {string} res Gmail response
   */
  async function onLoginSuccess(res) {
    //get data in redux store
    //let info = userData;
    //get email from gmail response
    let userEmail = res.profileObj.email;

    //set email state with email value from gmail response
    setemail(userEmail);
/*
    info.gmail.tokenId  = res.tokenId;



    //update user info in redux store
    info.isLoggedInGmail = true;
    info.activeWallet = "gmail";
    info.gmail.email = res.profileObj.email;
    info.gmail.tokenId = res.tokenId;
*/
    //var userHasWallet = null;

    //construct params to send to API
    const params = {
      email: TAIL + userEmail,
    };
    //API to check if user has wallet
    //const api = 'https://3gjxiw43y1.execute-api.us-east-1.amazonaws.com/prod/haswallet';
    const walletExistsAPI = 'https://z1wgz556ie.execute-api.us-east-1.amazonaws.com/dev/walletExists';
    let userHasWallet = await axios
    .post(walletExistsAPI, params).then(async (data) => { 
      let pubKey = data.data.userPubKey;
     
      //wallet not found
      if (pubKey == null){
        /*
        User does not have wallet, we need to ask them questions about the pass mode then sign up
          1- Do you want to create a password or not?
          2- If yes, do you want to save the password in the current session or not?
          
          No password: 1
          Create password and do not save in the session: 2
          Create password and save in the session: 3
        */
        let userChoice = null;
        userChoice = window.prompt("Choose one option from these two:\n1. Create a wallet with no password (More convenient, less secure)\n2. Create a wallet with a password. (Less convenient, more secure)");
        //check the input choice is valid
        if (userChoice == null || userChoice == "") {
          alert(`Invalid Input`);
        } else {
          if(userChoice === "1") {
            alert(`Please wait! Your wallet is being created and funded with 10 cspr. We will let you know once we are done`);
  
            //Store wallet in AWS
            let storeWalletParams = {
              "email" : TAIL + userEmail,
              "hasPassword": userChoice,
              "userPass": null
            }

            //API to check if user has wallet
            //let storeWalletAPI = 'https://3gjxiw43y1.execute-api.us-east-1.amazonaws.com/prod/awssecretsmanager';
            let storeWalletAPI = 'https://z1wgz556ie.execute-api.us-east-1.amazonaws.com/dev/storeWallet';
            
            axios
            .post(storeWalletAPI, storeWalletParams).then(async (data) => {
                let userPubKey = data.data.userPubKey;
                if (userPubKey) {
                    //Fund wallet with 10 cspr
                    /*
                    await fundWallet(
                      process.env.REACT_APP_TREASURY_WALLET_PUBLIC_KEY,
                      userPubKey,
                      7,
                      0,
                      0,
                      this,
                      2,
                      null
                    );
                      */
                    //get casper balance using user's public address and set the balance 
                    /*
                    getBalance(userPubKey).then(
                      function (value) {
                        setBalance(value)
                      },
                      function (error) { console.log(`Error while retrieving casper balance: ${error}`) }
                    );
                    */
                    //info.gmail.public_address = userPubKey;
                    //info.gmail.hasGmailPassword = userChoice;
                    //dispatch action to update user info in redux
                    //dispatch(setUserLoginStatus(info));

                }

            }).catch((error) => {
                console.log(`Error while creating wallet ${error}`);
            })
            
            //dispatch action to update user info in redux
            //dispatch(setUserLoginStatus(info));
            //wallet creation and fund is done successfully
            alert(`Wallet is created and funded successfully`);
        } else if (userChoice === "2") {

            //get password from the user
            let userPass = window.prompt("Enter your password: ");
          
            //check the input password is valid
            if (userPass == null || userPass == "") {
              alert(`Invalid Input`);
            } else {
              //Store wallet in AWS
              let storeWalletParams = {
                "email" : TAIL + userEmail,
                "hasPassword": userChoice,
                "userPass": userPass
              }

            //API to check if user has wallet
            //let storeWalletAPI = 'https://3gjxiw43y1.execute-api.us-east-1.amazonaws.com/prod/awssecretsmanager';
            let storeWalletAPI = 'https://z1wgz556ie.execute-api.us-east-1.amazonaws.com/dev/storeWallet';
            
            axios
            .post(storeWalletAPI, storeWalletParams).then(async (data) => {
                let userPubKey = data.data.userPubKey;
                if (userPubKey) {
                    //Fund wallet with 10 cspr
                    /*
                    await fundWallet(
                      process.env.REACT_APP_TREASURY_WALLET_PUBLIC_KEY,
                      userPubKey,
                      7,
                      0,
                      0,
                      this,
                      2,
                      null
                    );
    
                    //get casper balance using user's public address and set the balance 
                    getBalance(userPubKey).then(
                      function (value) {
                        setBalance(value)
                      },
                      function (error) { console.log(`Error while retrieving casper balance: ${error}`) }
                    );
                    
                    info.gmail.public_address = userPubKey;
                    info.gmail.hasGmailPassword = userChoice;
                
                    //dispatch action to update user info in redux
                    dispatch(setUserLoginStatus(info));
            
                    //check if user has NFT in this wallet or not
                    nftsChecker(userPubKey);
                    */
                }


              }).catch((error) => {
                  console.log(`Error while creating wallet ${error}`);
              })

              //dispatch action to update user info in redux
              //dispatch(setUserLoginStatus(info));

              //wallet creation and fund is done successfully
              alert(`Wallet is created and funded successfully`);
            }
        }
        }

      }  else if (pubKey){
        //wallet found  
        //get user password status
        let userHasPassword = data.data.userHasPassword;

        //If user already has a wallet: retrieve the public address and the hasPassword and save them in redux store
        //info.gmail.public_address = pubKey;
        //info.gmail.hasGmailPassword = userHasPassword;
        
        if (pubKey != null) {
          //get casper balance using user's public address and set the balance 
          /*
          getBalance(pubKey).then(
            function (value) {
              setBalance(value)
            },
            function (error) { console.log(`Error while retrieving casper balance: ${error}`) }
          );
    
          //check if user has NFT in this wallet or not
          nftsChecker(pubKey);
            */
        }
        //dispatch action to update user info in redux
        //dispatch(setUserLoginStatus(info));
        alert(`Wallet Found`);
      }
    }).catch((error) => {
        console.log(`Error while checking whether user has wallet or not: ${error}`);
    })  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  const onSignoutSuccess = () => {
    alert("Logged out successfully");
    email = "";
    setemail(email);
  };


  return (
    <div className='d-inline-flex'>
      <div>
        <GoogleLogin
          clientId={clientId}
          render={renderProps => (
            <img src={"./assets/images/icons/googleLogin.png"} style={{ marginLeft: "2px" }} onClick={() => { renderProps.onClick(); }
            } ></img>
          )}
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={'single_host_origin'}
        //isSignedIn={true}
        />

      </div>
      <div className='d-inline-block'>

      </div>

    </div>
  );
}



export default GmailAuth;