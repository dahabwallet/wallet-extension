import { useState } from 'react';
import colors from "../../includes/colors"
import { MDBInput } from 'mdb-react-ui-kit';
import meets_password_criteria from "../../scripts/meets_password_criteria"
import store_password from "../../scripts/store_password"

import create_mnemonic from "../../scripts/create_mnemonic"
import create_seed from "../../scripts/create_seed"
import create_wallet_cspr from "../../scripts/Casper/create_wallet"
import create_wallet_sol from "../../scripts/Solana/create_wallet"
import create_wallet_eth from "../../scripts/ethereum/eth_create_wallet"

const create_wallet_local = async (password) => {
  if (meets_password_criteria(password)) {
    store_password(password);
    const my_mnemonic = create_mnemonic();
    const my_seed = await create_seed(my_mnemonic)
    create_wallet_eth(my_mnemonic);
    create_wallet_sol(my_seed);
    create_wallet_cspr(my_seed);

    window.location.reload();
  } else {
    alert("Please, use a stronger password with at least one digit, one uppercase, one lowercase, one special character and a minimum length of 8 characters.")
  }
}

const CreateWalletPage = () => {
  const [password, set_password] = useState("");

  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <MDBInput label='Password' type='password' size='lg' onChange={e => set_password(e.target.value)} />
      <MDBInput label='Confirm Password' type='password' size='lg' />
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
export default CreateWalletPage;
