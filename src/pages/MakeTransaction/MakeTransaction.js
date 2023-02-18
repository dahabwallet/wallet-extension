import { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner'

import colors from "../../includes/colors"
import { MDBInput } from 'mdb-react-ui-kit';
import { useLocation, useNavigate } from "react-router-dom";
import ethSendTransaction from "../../scripts/ethereum/eth_make_transfer_transaction"
import csprSendTransaction from "../../scripts/Casper/transfer_transaction"
import solSendTransaction from "../../scripts/Solana/make_transfer_transaction"
import maticSendTransaction from "../../scripts/Polygon/make_transfer_transaction"
import csprGetBalance from "../../scripts/Casper/get_balance"
import solGetBalance from "../../scripts/Solana/get_balance"
import ethGetBalance from "../../scripts/ethereum/eth_get_balance"
import { useSelector } from 'react-redux';


import { getPolygonMaticBalance, getPolygonWethBalance } from "../../scripts/Polygon/get_balance"


import { claimKeys } from '../../scripts/claim_keys'

import 'bootstrap/dist/css/bootstrap.css';

const abbreviations_map = {
  "casper": "CSPR",
  "ethereum": "ETH",
  "solana": "SOL",
  "polygon": "MATIC"
}

const parseBalance = (balance) => {
  let nearest_decimal = 6;
  return Number(parseFloat(balance).toFixed(nearest_decimal))
}
const getSelectedChainBalance = async (selectedChain, length, password) => {
  const chain_name_lower = selectedChain.toLowerCase();
  let abbr = abbreviations_map[chain_name_lower];


  let priv_key = claimKeys(`${abbr}`, length, password)[`${abbr}_privateKey`];
  let pub_key = claimKeys(`${abbr}`, length, password)[`${abbr}_publicKey`];

  // console.log ("priv_key: ", priv_key)
  // console.log ("pubkey: ", pub_key)

  switch (chain_name_lower) {
    case 'casper':
      let cspr_balance = await csprGetBalance(pub_key);
      return cspr_balance
    case 'ethereum':
      let eth_balance = await ethGetBalance(priv_key);
      return eth_balance
    case 'solana':
      let sol_balance = await solGetBalance(pub_key);
      return sol_balance
    case 'polygon':
      let matic_balance =
        // await getPolygonWethBalance(priv_key, pub_key); //This finds weth balance on polygon
        await getPolygonMaticBalance(priv_key);
      return matic_balance
    default:
      console.log(`Chain Not Found`);
  }
}

const transferTransaction = async (selectedChain, receiverAddr, amount, navigate, setLoading, length, password) => {
  try {

    let chain_name = selectedChain.toLowerCase()
    let abbr = abbreviations_map[chain_name]
    let sender_priv_key = claimKeys(`${abbr}`, length, password)[`${abbr}_privateKey`];

    // console.log ("sender_prive_key: ", sender_priv_key)
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
      case 'Polygon':
        await maticSendTransaction(sender_priv_key, receiverAddr, amount)
        break;
      default:
        break;
    }
    navigate('/report', { state: { message: 'Transaction Succeeded', statusId: 1, page: 'wallet' } })
  } catch (e) {
    let error_message = e.toString().split("(", 1)[0]
    navigate('/report', { state: { message: `Transaction Failed: ${error_message}`, statusId: 2, page: 'wallet' } })
  }
  setLoading(false)
}

const MakeTransactionPage = () => {
  const [receiverAddr, setReceiverAddr] = useState("");
  const [amount, setAmount] = useState("");
  const chains = ["Casper", "Ethereum", "Solana", "Polygon"];
  const [balance, setBalance] = useState('-')
  const [amount_str, setAmountStr] = useState("Amount in CSPR")
  const [loadingRing, setLoadingRing] = useState(false)
  const [pubKey, setPubKey] = useState("0x0000")


  const length = 128

  const password = useSelector((state) => state.password);

  let navigate = useNavigate();


  const [selectedChain, setSelectedChain] = useState(chains[0]);

  useEffect(() => {
    async function getBalance() {
      setBalance('-')
      setPubKey("0x000")
      let balance = await getSelectedChainBalance(selectedChain, length, password)
      setBalance(parseBalance(balance))
    }
    getBalance()
    // let abbr= abbreviations_map[selectedChain.toLowerCase()]
    setPubKey(claimKeys(`${abbreviations_map[selectedChain.toLowerCase()]}`, length, password)[`${abbreviations_map[selectedChain.toLowerCase()]}_publicKey`]);

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
      <h2 class="display-3" style={styles.fineTextStyle}>Public Key: {pubKey}</h2>


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
        transferTransaction(selectedChain, receiverAddr, amount, navigate, setLoadingRing, length, password)
      }
      }>
        Send Transaction
      </button>

      <button className='btn' style={styles.btnStyle} onClick={() => {
        navigate('/swap', { state: { length: `${length}`, password: `${password}` } })
      }
      }>
        Want to Swap?
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
    border: "none",
    marginBottom: 20
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
    fontSize: window.innerWidth / 48,
    justifyContent: "center",
    marginTop: 10
  },
  imgStyle: {
    width: 240,
    height: 200
  }
}
export default MakeTransactionPage;
