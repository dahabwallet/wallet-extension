import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Startup from "./pages/Startup/Startup";
import CreateWallet from "./pages/CreateWallet/CreateWallet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Startup />} />
        <Route path="/create-wallet" element={<CreateWallet />} />
      </Routes>
    </Router>
  );
}

export default App;
