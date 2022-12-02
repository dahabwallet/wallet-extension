import { useState } from 'react';
import colors from "../../includes/colors"
import { RotatingLines } from 'react-loader-spinner'
import { MDBInput } from 'mdb-react-ui-kit';
import meets_password_criteria from "../../scripts/meets_password_criteria"
import store_password from "../../scripts/store_password"
import create_wallet_cspr from "../../scripts/Casper/create_wallet"
import create_wallet_sol from "../../scripts/Solana/create_wallet"
import create_wallet_eth from "../../scripts/ethereum/eth_create_wallet"
import { useLocation, useNavigate } from "react-router-dom";
// need to bring password input from the NewWalletPassword File
const NonCustodial_create_wallet_local = (password) => {
  if (meets_password_criteria(password)) {
    store_password(password);
    create_wallet_cspr();
    create_wallet_sol();
    create_wallet_eth();
    // create_wallet_polygon()
  } else {
    alert("Wallet Creation Failed!")
  }
}

const Custodial_create_wallet_local = (password) => {
// Omar Function call
}

const CustodyChoicePage = () => {
  const [loadingRing, setLoadingRing] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation();
  const [password, set_password] = useState(state.password);
console.log("password is: " + password)
 
  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <h3>Custody choice</h3> <br></br>
      <h5>Non-Custodial: you keep your own keys</h5> <br></br>
      <h5>Custodial: we securely store your keys</h5> <br></br>

      <RotatingLines
        strokeColor="green"
        strokeWidth="5"
        animationDuration="0.75"
        width="90"
        visible={loadingRing} />
      
      <button className='btn' style={styles.btnStyle} onClick={() => NonCustodial_create_wallet_local(password)}>
        Non-Custodial
      </button>
      <br></br>

      
      <button className='btn' style={styles.btnStyle} onClick={() => Custodial_create_wallet_local(password)}>
        Custodial
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
export default CustodyChoicePage;
