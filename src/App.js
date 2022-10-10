import './App.css';
import { changeColor } from './main';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={changeColor}>
          Submit
        </button>
      </header>
    </div>
  );
}

export default App;