import { useState } from 'react';
import colors from "../../includes/colors"
import { MDBInput } from 'mdb-react-ui-kit';
import meets_password_criteria from "../../scripts/meets_password_criteria"
import store_password from "../../scripts/store_password"
import create_wallet_cspr from "../../scripts/Casper/create_wallet"
import create_wallet_sol from "../../scripts/Solana/create_wallet"
import create_wallet_eth from "../../scripts/ethereum/eth_create_wallet"
import {claimKeys} from '../../scripts/claim_keys'


const create_wallet_local = (length, password) => {
  if (meets_password_criteria(password)) {
    // let obj= claimKeys("ETH", 128, "dsaff");
    // console.log ("claimobj: ", obj)
    // claimKeys("SOL", 128, "macoisnothing");
    // claimKeys("CSPR", 128, "macoisnothing");

    store_password(password);
    create_wallet_cspr(length,password);
    create_wallet_sol(length, password);
    create_wallet_eth(length, password);

    window.location.reload();
  } else {
    alert("Please, use a stronger password with at least one digit, one uppercase, one lowercase, one special character and a minimum length of 8 characters.")
  }
}

const ImportWalletPage = () => {
  const [password, set_password] = useState("");
  const length= 128
  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <br></br>
      <h4> Enter your 12 mnemonic phrase</h4>
      <br></br>
      <MDBInput label='1.' type='password' size='lg' /> {//onChange={e => set_password(e.target.value)}
      }
      <MDBInput label='2.' type='password' size='lg' />
      <MDBInput label='3.' type='password' size='lg' />
      <br></br>
      <button className='btn' style={styles.btnStyle} onClick={() => create_wallet_local(password)}>
        Create Wallet
      </button>
    </div >

  );
}
const styles = {
  parentStyle: {
    height: "100vh",
    width: "100vw",
    backgroundColor: colors['grey-background'],
    flexDirection: "column",
    "font-family": 'Montserrat Alternates',
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
export default ImportWalletPage;
