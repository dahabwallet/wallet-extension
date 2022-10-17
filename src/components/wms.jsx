import React, { Component, Fragment } from "react";
import ReactGA from 'react-ga';
import { NavLink, Link } from "react-router-dom";

class WMS extends Component {
	styles = {
		fontSize: "20px",
		color: "white",
    	backgroundColor: "#7f7979",
    	padding: "30px",
		margin: "10px"
	}

	render() { 
		return (
				<Fragment>
					<div>
						Welcome to the Wallet Management System
					</div>
                    <div>
                        <button style={this.styles}>
                                <NavLink to="/casper-wallet-signup">Sign up</NavLink>
                            </button>
                
                        <button style={this.styles}>
                            <NavLink to="/casper-wallet-signin">Sign In</NavLink>
                        </button>
                    </div>
				</Fragment>
				);
			}
}
 
export default WMS;
