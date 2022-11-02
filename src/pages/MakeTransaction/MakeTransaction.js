import { useState } from 'react';
import colors from "../../includes/colors"
import { MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import send_transaction from "../../scripts/make_transfer_transaction"
import getBalance from "../../scripts/casper_balance"

const send_transaction_navigate = async(navigate, receiver_addr, amount) => {

    //let sender_priv_key= window.localStorage.getItem('privateKey');
    let sender_pub_key = window.localStorage.getItem('CSPR_publicKey');
    console.log(`sender pub key: ${sender_pub_key}`);

    
    
    try{
      await send_transaction(sender_pub_key, receiver_addr, amount, 0, 0);
      alert("Transaction Successful");
    }
    catch(e) {
      alert("Transaction Failed");
      console.log(e);
      } 
}

const getBalance1 = async() => {
  getBalance();
}

const MakeTransactionPage = () => {
  const [receiver_addr, set_receiver_addr] = useState("");
  const [amount, set_amount] = useState("");

  let navigate = useNavigate();

  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <MDBInput label='Receiver Address' type='text' size='lg' onChange={e => set_receiver_addr(e.target.value)} />
      <MDBInput label='Amount in CSPR' type='text' size='lg' onChange={e => set_amount(e.target.value)} />

      <button className='btn' style={styles.btnStyle} onClick={() => send_transaction_navigate(navigate, receiver_addr, amount)}>
        Send Transaction
      </button>
      <button className='btn' style={styles.btnStyle} onClick={() => getBalance1()}>
        Get Balance
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
