import { useState } from 'react';
import colors from "../../includes/colors";
import { MDBInput } from 'mdb-react-ui-kit';
import meets_password_criteria from "../../scripts/meets_password_criteria";
import store_password from "../../scripts/store_password";
import create_wallet_cspr from "../../scripts/Casper/create_wallet";
import create_wallet_sol from "../../scripts/Solana/create_wallet";
import create_wallet_eth from "../../scripts/ethereum/eth_create_wallet";

/**
 * Creates a wallet locally with a provided password.
 * Validates the password against certain criteria, stores the password, and creates wallets for different blockchain networks.
 * @param {string} password - The password for the wallet.
 */
const create_wallet_local = (password) => {
  if (meets_password_criteria(password)) {
    // Validate the password against criteria
    store_password(password); // Store the password
    create_wallet_cspr(); // Create a wallet for Casper
    create_wallet_sol(); // Create a wallet for Solana
    create_wallet_eth(); // Create a wallet for Ethereum
    // window.location.reload();
  } else {
    alert("Please use a stronger password with at least one digit, one uppercase letter, one lowercase letter, one special character, and a minimum length of 8 characters.");
  }
}

/**
 * React component for the Create Wallet page.
 * Renders a form for creating a wallet with a password.
 */
const CreateWalletPage = () => {
  const [password, set_password] = useState(""); // State to store the password

  return (
    <div style={styles.parentStyle}>
      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 className="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <MDBInput label='Password' type='password' size='lg' onChange={e => set_password(e.target.value)} />
      <MDBInput label='Confirm Password' type='password' size='lg' />
      <button className='btn' style={styles.btnStyle} onClick={() => create_wallet_local(password)}>
        Create Wallet
      </button>
    </div>
  );
}

// Styles for the CreateWalletPage component
const styles = {
  parentStyle: {
    height: "100vh",
    width: "100vw",
    backgroundColor: colors['grey-background'],
    flexDirection: "column",
    fontFamily: 'Montserrat Alternates',
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  btnStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: "white",
    backgroundColor: colors['orange'],
    border: "none"
  },
  imgStyle: {
    width: 240,
    height: 200
  }
}

export default CreateWalletPage;
