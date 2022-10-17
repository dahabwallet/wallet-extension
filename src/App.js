import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import ReactGA from "react-ga";
import Home from "./components/home";
import WMS from "./components/wms";
import CasperWalletSignup from "./components/CasperWalletSignup";
import CasperWalletSignin from "./components/CasperWalletSignin";

function App() {
  return (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="wms" element={<WMS />} />
            <Route path="casper-wallet-signup" element={<CasperWalletSignup />} />
	          <Route path="casper-wallet-signin" element={<CasperWalletSignin />} />
          </Routes>
        </HashRouter>
  );
}

export default App;
