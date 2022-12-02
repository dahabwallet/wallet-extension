import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import MakeTransaction from "./pages/MakeTransaction/MakeTransaction"
import Swap from "./pages/Swap/Swap"
import CreateWallet from "./pages/CreateWallet/CreateWallet";
import ImportWallet from "./pages/ImportWallet/ImportWallet";
import ImportOrCreate from "./pages/ImportOrCreate/ImportOrCreate";
import privatekey_exists from "./scripts/privatekey_exists"
import Report from "./pages/Report/Report";
import NewWalletPassword from "./pages/NewWalletPassword/NewWalletPassword"
import CustodyChoice from "./pages/CustodyChoice/CustodyChoice"

// import privatekey_exists from "../../scripts/privatekey_exists"

function App() {
  return (
    <Router>
      <Routes>
        {
          privatekey_exists() ? <Route path="/" element={<Login />} /> :
            <Route path="/" element={<ImportOrCreate />} />

        }
        <Route path="/createWallet" element={<CreateWallet />} />
        <Route path="/importWallet" element={<ImportWallet />} />
        <Route path="/newWalletPassword" element={<NewWalletPassword />} />
        <Route path="/wallet" element={<MakeTransaction />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/report" element={<Report />} />
        <Route path="/CustodyChoice" element={<CustodyChoice />} />

      </Routes>
    </Router>
  );
}

export default App;
