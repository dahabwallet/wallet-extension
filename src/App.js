import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import MakeTransaction from "./pages/MakeTransaction/MakeTransaction"
import Swap from "./pages/Swap/Swap"
import ImportWallet from "./pages/ImportWallet/ImportWallet";
import ImportOrCreate from "./pages/ImportOrCreate/ImportOrCreate";
import privatekey_exists from "./scripts/privatekey_exists"
import Report from "./pages/Report/Report";
import NewWalletPassword from "./pages/NewWalletPassword/NewWalletPassword"
import CustodyChoice from "./pages/CustodyChoice/CustodyChoice"
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {
            privatekey_exists() ? <Route path="/" element={<Login />} /> :
              <Route path="/" element={<ImportOrCreate />} />
          }
          <Route path="/importWallet" element={<ImportWallet />} />
          <Route path="/newWalletPassword" element={<NewWalletPassword />} />
          <Route path="/wallet" element={<MakeTransaction />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/report" element={<Report />} />
          <Route path="/CustodyChoice" element={<CustodyChoice />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
