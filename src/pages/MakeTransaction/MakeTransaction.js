import { useState, useEffect } from 'react';

import colors from "../../includes/colors"
import { MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import send_transaction from "../../scripts/make_transfer_transaction"
import ethGetBalance from "../../scripts/eth_get_balance"

import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { recoverPublicKey } from 'ethers/lib/utils';

const abbreviations_map = { 

  "casper": "CSPR",
  "ethereum": "ETH",
  "solana": "SOL"

}



const balance_map= {
  "casper": 4000, 
  "ethereum":0.0222586,
  "solana": 120.526
}


function DropdownForm(props) {
  const chains = props.chains

  const [selected_chain, setSelectedChain] = useState(chains[0]);

  return (
    <form>
      <select 
       value={selected_chain} 
       onChange={e => setSelectedChain(e.target.value)}>
        {chains.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </form>
  );
}



const masterGetBalance=  (chain_name) =>{

  let nearest_decimal= 4;
  
  
  return Number(parseFloat(balance_map[chain_name]).toFixed(nearest_decimal))
  // if (chain_name == 'casper')
  // return casperGetBalance();

  // if (chain_name == 'ethereum')
  //   return  ethGetBalance(priv_key);
  //   // return ethereumGetBalance();
  
  // if (chain_name == 'solana')
  // return solanaGetBalance();

}

// function DropdownForm(props) {
//   const chains = props.chains
//   const [selected, setSelectedChain] = useState(chains[0]);
//   return (
//     <Dropdown OnClick={e => setSelectedChain(e.target.value)}>
      
//         <Dropdown.Toggle value={selected} OnClick={e => setSelectedChain(e.target.value)} variant="success">
//         {selected} 
//         </Dropdown.Toggle>
//         <Dropdown.Menu value={selected}  OnClick={e => setSelectedChain(e.target.value)}>
//         {chains.map((value) => (
//           <Dropdown.Item href='#'>
//             {value}
//           </Dropdown.Item>
//         ))}
          
//         </Dropdown.Menu>
//       </Dropdown>
   
//   );
// }



const getAllBalances= async (chains) => {

  console.log("get_all_balances executed . .  ")
  

  for (const chain_name of chains) {
    
      const chain_name_lower= chain_name.toLowerCase()
      let abbr= abbreviations_map[chain_name_lower]
      let priv_key= window.localStorage.getItem(`${abbr}_privateKey`);
      

      if (chain_name_lower == 'casper')
          balance_map[chain_name_lower]=  900;

      else if (chain_name_lower == 'ethereum'){

          let eth_balance= await ethGetBalance(priv_key)
          balance_map[chain_name_lower]=  eth_balance
          // balance_map[chain_name_lower]=  0.000000235

      }
         

      else if (chain_name_lower == 'solana')
           balance_map[chain_name_lower]=  37




  }






}

function casperSendTransaction(sender_priv_key, receiver_addr, amount){
  alert("casper send");
}

const ethereumSendTransaction = async (navigate, sender_priv_key, receiver_addr, amount) => {

  try{
    
    await send_transaction(sender_priv_key, receiver_addr, amount);
    navigate('/report', { state: { message: 'Transaction Succeeded', statusId: 1, page: 'wallet' } })
   
  
  }
  
  catch(e) {
    
    let error_message= e.toString().split("(", 1)[0]
    console.log("error message: ", error_message)
    navigate('/report', { state: { message: `Transaction Failed: ${error_message}`, statusId: 2, page: 'wallet' } })
        
    } 
}


function solanaSendTransaction(sender_priv_key, receiver_addr, amount){
  alert("solana send");
}


const  masterSendTransaction = async (navigate, chain_name, receiver_addr, amount) => {


  chain_name= chain_name.toLowerCase()

  let abbr= abbreviations_map[chain_name]
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
      const chains = ["Casper", "Ethereum", "Solana"];
      const [balance, setBalance]= useState(masterGetBalance(chains[0].toLowerCase()))
      const [amount_str, setAmountStr]= useState("Amount in CSPR")

      let navigate = useNavigate();


      useEffect(()=>{getAllBalances(chains);},[])

      

      const [selected_chain, setSelectedChain] = useState(chains[0]);
      

      return (
        <div style={styles.parentStyle}>

          <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
          <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>

          <form>
          <select 
          value={selected_chain} 
          onChange={(e) => {setSelectedChain(e.target.value); setBalance(masterGetBalance(e.target.value.toLowerCase())); setAmountStr(`Amount in ${abbreviations_map[e.target.value.toLowerCase()]}`)}}>
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

          <button className='btn' style={styles.btnStyle} onClick={() => masterSendTransaction(navigate, selected_chain, receiver_addr, amount)}>
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
