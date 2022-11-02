import { useState } from 'react';
import colors from "../../includes/colors"
import { MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import send_transaction from "../../scripts/make_transfer_transaction"
import ethGetBalance from "../../scripts/eth_get_balance"

import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { recoverPublicKey } from 'ethers/lib/utils';

const abbreviations_map = new Map([
    
  ["casper", "CSPR"],
  ["ethereum", "ETH"],
  ["solana", "SOL"]

]);


function DropdownForm(props) {
  const chains = props.chains

  const [selected, setSelected] = useState(chains[0]);

  return (
    <form>
      <select 
       value={selected} 
       onChange={e => setSelected(e.target.value)}>
        {chains.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </form>
  );
}

function casperGetBalance(){
  return 4000;
}

function ethereumGetBalance(){
  return 0.0222586;
}
function solanaGetBalance(){
  return 120.526;
}

const masterGetBalance=  (chain_name) =>{

  let abbr= abbreviations_map.get(chain_name)
  let priv_key= window.localStorage.getItem(`${abbr}_privateKey`);
  // console.log("private key: ", priv_key)
  // console.log("abbr ", abbr)

  
  if (chain_name == 'casper')
  return casperGetBalance();

  if (chain_name == 'ethereum')
    // return  ethGetBalance(priv_key);
    return ethereumGetBalance();
  
  if (chain_name == 'solana')
  return solanaGetBalance();

}

// function DropdownForm(props) {
//   const chains = props.chains
//   const [selected, setSelected] = useState(chains[0]);
//   return (
//     <Dropdown OnClick={e => setSelected(e.target.value)}>
      
//         <Dropdown.Toggle value={selected} OnClick={e => setSelected(e.target.value)} variant="success">
//         {selected} 
//         </Dropdown.Toggle>
//         <Dropdown.Menu value={selected}  OnClick={e => setSelected(e.target.value)}>
//         {chains.map((value) => (
//           <Dropdown.Item href='#'>
//             {value}
//           </Dropdown.Item>
//         ))}
          
//         </Dropdown.Menu>
//       </Dropdown>
   
//   );
// }

function casperSendTransaction(sender_priv_key, receiver_addr, amount){
  alert("casper send");
}

const ethereumSendTransaction = async (navigate, sender_priv_key, receiver_addr, amount) => {

  try{
    
    await send_transaction(sender_priv_key, receiver_addr, amount);
    alert("Transaction Successful")
  
  }
  catch(e) {
    alert("Transaction Failed")

    console.log(e)
      
    } 
}


function solanaSendTransaction(sender_priv_key, receiver_addr, amount){
  alert("solana send");
}


const  masterSendTransaction = async (navigate, chain_name, receiver_addr, amount) => {


  chain_name= chain_name.toLowerCase()

  let abbr= abbreviations_map.get(chain_name)
  let sender_priv_key= window.localStorage.getItem(`${abbr}_privateKey`);
  
  try{
    
    if (chain_name == 'casper')
      casperSendTransaction();

    if (chain_name == 'ethereum')
      ethereumSendTransaction(navigate, sender_priv_key, receiver_addr, amount);
  
    if (chain_name == 'solana')
      solanaSendTransaction();

    // await send_transaction(sender_priv_key, receiver_addr, amount);
    // alert("Transaction Successful")
  
  }
  catch(e) {
    alert("Transaction Failed")

    console.log(e)
      
    } 
}



const MakeTransactionPage = () => {
  const [receiver_addr, set_receiver_addr] = useState("");
  const [amount, setAmount] = useState("");
  const chains = ["Casper", "Solana", "Ethereum"];
  const [balance, setBalance]= useState(masterGetBalance(chains[0].toLowerCase()))
  const [amount_str, setAmountStr]= useState("Amount in CSPR")


  let navigate = useNavigate();
  

  const [selected, setSelected] = useState(chains[0]);

  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>

      <DropdownForm chains= {chains}></DropdownForm>

      <form>
      <select 
       value={selected} 
       onChange={(e) => {setSelected(e.target.value); setBalance(masterGetBalance(e.target.value.toLowerCase())); setAmountStr(`Amount in ${abbreviations_map.get(e.target.value.toLowerCase())}`)}}>
        {chains.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </form>

      <h2 class="display-3" style={{ color: colors["black-text"] }}>Balance: {balance}</h2>
    

      <MDBInput label='Receiver Address' type='text' size='lg' onChange={e => set_receiver_addr(e.target.value)} />
      <MDBInput label={amount_str} type='text' size='lg' onChange={e => setAmount(e.target.value)} />

      <button className='btn' style={styles.btnStyle} onClick={() => masterSendTransaction(navigate, selected, receiver_addr, amount)}>
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
