import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import CreateWallet from "./pages/CreateWallet/CreateWallet";
// import privatekey_exists from "../../scripts/privatekey_exists"

function App() {
  return (
    <Router>
      <Routes>
        {
          //privatekey_exists()?
          true ? <Route path="/" element={<Login />} /> :
            <Route path="/" element={<CreateWallet />} />
        }

      </Routes>
    </Router>
  );
}

export default App;
