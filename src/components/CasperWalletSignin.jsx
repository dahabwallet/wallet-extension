import React, { Component, Fragment } from "react";

import AWS from 'aws-sdk';

class CasperWalletSignin extends Component {
	constructor() {
		super();
		this.state = {value: ''};
	
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	region = "us-east-1";
	secretName = "dev2/wms2";
	secret;
	decodedBinarySecret;
	
	
	 
/*
	componentDidMount(){
		this.signIn();
	}
	*/
	handleChange(event) {
		this.setState({value: event.target.value});
	  }
	
	  handleSubmit(event) {
		alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
		this.signIn(this.state.value);
	  }
	    render() { 
                return (
                    <Fragment>
                        <div>
                            Casper Wallet Signin
                        <form onSubmit={this.handleSubmit}>
                            <label>
                            Email:
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                        </div>
                    </Fragment>
                        );
            }

	getSecretIDForKey(keyName) {
		return 'dev/wms/' + keyName;
	}
	async signIn(keyName){
		AWS.config.update({
            accessKeyId: "",
            secretAccessKey: "",
            "region": "us-east-1"
		});
		console.log("inside sign in");
		var client = new AWS.SecretsManager({
				               region: this.region
				              });
	
		await client.getSecretValue({SecretId: this.getSecretIDForKey("temp")}, function(err, data) {
			        console.log("Get Secret Value");
			    if (err) {
                        console.log("Error");
                    if (err.code === 'DecryptionFailureException'){
                                console.log("Dec");

                                throw err;
                            } else if (err.code === 'InternalServiceErrorException')
                            {
                                console.log("internal");

                                throw err;
                                    }
                                else if (err.code === 'InvalidParameterException')
                            {
                                console.log("invalid params");
                                throw err;
                                    }
                                else if (err.code === 'InvalidRequestException')
                            {
                                console.log("invalid req");
                                throw err;
                                    }
                                else if (err.code === 'ResourceNotFoundException')
                            {
                                console.log("resource not found");
                                throw err;
                            }
                }
			    else {
                    if ('SecretString' in data) {
                        this.secret = data.SecretString;
                        console.log("Secret String: ", this.secret);
                    } else {
                                let buff = new Buffer(data.SecretBinary, 'base64');
                                this.decodedBinarySecret = buff.toString('ascii');
                                console.log("Decoded Secret String: ", this.decodedBinarySecret);

                            }
                }

		}).promise();

	}
	
}
 
export default CasperWalletSignin;
