import { useState } from 'react';
import colors from "../../includes/colors"
import { MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import send_transaction from "../../scripts/make_transfer_transaction"

// import is_password_valid from "../../scripts/is_password_valid"

const  send_transaction_navigate = (navigate, sender_priv_key, receiver_addr, amount) => {
 try{
  let result=  send_transaction(sender_priv_key, receiver_addr, amount);
  navigate("/transaction-successful", { replace: true });
 }
 catch(e) {
  console.log(e)
    
  } 
}
const MakeTransactionPage = () => {
  const [receiver_addr, set_receiver_addr] = useState("");
  const [amount, set_amount] = useState("");

  let navigate = useNavigate();
  let  sender_priv_key= "a4295385c67787a34e49c4ead739b0d13da7650d84501100f3c4c5b6c89e59c3"
// receiver_pub_key= "0x313907De9f0F4722E4aE9de2b54E456CbB2a4929"
// amount= "0.002"
// send_transaction(sender_priv_key, receiver_pub_key, amount)

  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <MDBInput label='Receiver Address' type='text' size='lg' onChange={e => set_receiver_addr(e.target.value)} />
      <MDBInput label='Amount in ETH' type='text' size='lg' onChange={e => set_amount(e.target.value)} />

      <button className='btn' style={styles.btnStyle} onClick={() => send_transaction_navigate(navigate, sender_priv_key, receiver_addr, amount)}>
        Send Transaction
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
export default MakeTransactionPage;
