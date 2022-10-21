import { useState } from 'react';
import colors from "../../includes/colors"
import { MDBInput } from 'mdb-react-ui-kit';
import meets_password_criteria from "../../scripts/meets_password_criteria"
import store_password from "../../scripts/store_password"
// import generate_keypair from "../../scripts/generate_keypair"

const create_wallet = password => {

  if (meets_password_criteria(password)) {
    store_password(password);
    // generate_keypair();
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
      <button className='btn' style={styles.btnStyle} onClick={() => create_wallet(password)}>
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
