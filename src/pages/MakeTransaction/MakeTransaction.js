import { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner'

import colors from "../../includes/colors"
import { MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import ethSendTransaction from "../../scripts/ethereum/eth_make_transfer_transaction"
import csprSendTransaction from "../../scripts/Casper/transfer_transaction"
import solSendTransaction from "../../scripts/Solana/make_transfer_transaction"
import csprGetBalance from "../../scripts/Casper/get_balance"
import solGetBalance from "../../scripts/Solana/get_balance"
import ethGetBalance from "../../scripts/ethereum/eth_get_balance"

import 'bootstrap/dist/css/bootstrap.css';

const abbreviations_map = {
  "casper": "CSPR",
  "ethereum": "ETH",
  "solana": "SOL"
}

const parseBalance = (balance) => {
  let nearest_decimal = 6;
  return Number(parseFloat(balance).toFixed(nearest_decimal))
}
const getSelectedChainBalance = async (selectedChain) => {
  const chain_name_lower = selectedChain.toLowerCase();
  let abbr = abbreviations_map[chain_name_lower];
  let priv_key = window.localStorage.getItem(`${abbr}_privateKey`);
  let pub_key = window.localStorage.getItem(`${abbr}_publicKey`);

  switch (chain_name_lower) {
    case 'casper':
      let cspr_balance = await csprGetBalance();
      return cspr_balance
    case 'ethereum':
      let eth_balance = await ethGetBalance(priv_key);
      return eth_balance
    case 'solana':
      let sol_balance = await solGetBalance(pub_key);
      return sol_balance
    default:
      console.log(`Chain Not Found`);
  }
}

const transferTransaction = async (selectedChain, receiverAddr, amount, navigate, setLoading) => {
  try {

    let chain_name = selectedChain.toLowerCase()
    let abbr = abbreviations_map[chain_name]
    let sender_priv_key = window.localStorage.getItem(`${abbr}_privateKey`);
    setLoading(true)
    switch (selectedChain) {
      case 'Casper':
        await csprSendTransaction(sender_priv_key, receiverAddr, amount)
        break;
      case 'Ethereum':
        await ethSendTransaction(sender_priv_key, receiverAddr, amount);
        break;
      case 'Solana':
        await solSendTransaction(sender_priv_key, receiverAddr, amount)
        break;
    }
    navigate('/report', { state: { message: 'Transaction Succeeded', statusId: 1, page: 'wallet' } })
  } catch (e) {
    let error_message = e.toString().split("(", 1)[0]
    navigate('/report', { state: { message: `Transaction Failed: ${error_message}`, statusId: 2, page: 'wallet' } })
  }
}

const ethereumSendTransaction = async (navigate, sender_priv_key, receiver_addr, amount) => {
  try {
    await ethSendTransaction(sender_priv_key, receiver_addr, amount);
    navigate('/report', { state: { message: 'Transaction Succeeded', statusId: 1, page: 'wallet' } })
  }
  catch (e) {
    let error_message = e.toString().split("(", 1)[0]
    navigate('/report', { state: { message: `Transaction Failed: ${error_message}`, statusId: 2, page: 'wallet' } })
  }
}

const solanaSendTransaction = async (navigate, sender_priv_key, receiver_addr, amount) => {
  try {
    await solSendTransaction(sender_priv_key, receiver_addr, amount);
    navigate('/report', { state: { message: 'Transaction Succeeded', statusId: 1, page: 'wallet' } })
  }
  catch (e) {
    let error_message = e.toString().split("(", 1)[0]
    navigate('/report', { state: { message: `Transaction Failed: ${error_message}`, statusId: 2, page: 'wallet' } })
  }
}


const masterSendTransaction = async (navigate, chain_name, receiver_addr, amount, setLoadingRing) => {
  chain_name = chain_name.toLowerCase()
  let abbr = abbreviations_map[chain_name]
  let sender_priv_key = window.localStorage.getItem(`${abbr}_privateKey`);

  try {


    setLoadingRing(true);
    // await new Promise(r => setTimeout(r, 2000));
    // setLoadingRing(false);

    if (chain_name == 'casper')
      casperSendTransaction(navigate, sender_priv_key, receiver_addr, amount);

    if (chain_name == 'ethereum')
      ethereumSendTransaction(navigate, sender_priv_key, receiver_addr, amount);

    if (chain_name == 'solana')
      solanaSendTransaction(navigate, sender_priv_key, receiver_addr, amount);
    
    //  setLoadingRing(false);
  }
  catch (e) {
    setLoadingRing(false);
    navigate('/report', { state: { message: 'Transaction Failed', statusId: 2, page: 'wallet' } })
  }
  setLoading(false)
}

const MakeTransactionPage = () => {
  const [receiverAddr, setReceiverAddr] = useState("");
  const [amount, setAmount] = useState("");
  const chains = ["Casper", "Ethereum", "Solana"];
  const [balance, setBalance] = useState('-')
  const [amount_str, setAmountStr] = useState("Amount in CSPR")
  const [loadingRing, setLoadingRing] = useState(false)

  let navigate = useNavigate();


  const [selectedChain, setSelectedChain] = useState(chains[0]);

  useEffect(() => {
    async function getBalance() {
      setBalance('-')
      let balance = await getSelectedChainBalance(selectedChain)
      setBalance(parseBalance(balance))
    }
    getBalance()
    setAmountStr(`Amount in ${abbreviations_map[selectedChain.toLowerCase()]}`);
  }, [selectedChain])

  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <form>
        <select
          style={styles.dropDownStyle}
          value={selectedChain}
          onChange={e => {
            setSelectedChain(e.target.value)
          }}
        >
          {chains.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </form>

      <h2 class="display-3" style={styles.fineTextStyle}>Balance: {balance}</h2>


      <MDBInput label='Receiver Address' type='text' size='lg' onChange={e => set_receiver_addr(e.target.value)} />
      <MDBInput label={amount_str} type='text' size='lg' onChange={e => setAmount(e.target.value)} />

      <MDBInput label='Receiver Address' type='text' size='lg' onChange={e => setReceiverAddr(e.target.value)} />
      <MDBInput label={amount_str} type='text' size='lg' onChange={e => {
        setAmount(e.target.value)
      }}
      />
      <RotatingLines
        strokeColor="green"
        strokeWidth="5"
        animationDuration="0.75"
        width="90"
        visible={loadingRing} />
      <button className='btn' style={styles.btnStyle} onClick={() => {
        setLoadingRing(true)
        transferTransaction(selectedChain, receiverAddr, amount, navigate, setLoadingRing)
      }
      }>
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
  dropDownStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: "white",
    backgroundColor: colors['orange'],
    border: "none",
    width: 240,
    height: 30,
    justifyContent: "center"
  },
  fineTextStyle: {
    color: colors["black-text"],
    fontSize: 22,
    justifyContent: "center",
    marginTop: 10
  },
  imgStyle: {
    width: 240,
    height: 200
  }
}
export default MakeTransactionPage;
