import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import MakeTransaction from "./pages/MakeTransaction/MakeTransaction"
import CreateWallet from "./pages/CreateWallet/CreateWallet";
import privatekey_exists from "./scripts/privatekey_exists"
import TransactionSuccessful from "./pages/MakeTransaction/TransactionSuccessful";


// import privatekey_exists from "../../scripts/privatekey_exists"

function App() {
  return (
    <Router>
      <Routes>
        {
          privatekey_exists() ? <Route path="/" element={<Login />} /> :
            <Route path="/" element={<CreateWallet />} />
            
        }
        <Route path="/wallet" element={<MakeTransaction />} />
        <Route path="/transaction-successful" element={<TransactionSuccessful />} />

        

      </Routes>
    </Router>
  );
}

export default App;
