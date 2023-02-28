import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mnemon from "./pages/Mnemonics";


function App() {
  return (
    
    <Router>
      <Routes>
        
        <Route path="/" element={<Mnemon />} />

      </Routes>
    </Router>




    
    );
  
}

export default App;
