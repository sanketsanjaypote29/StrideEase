import './App.css';
import './index.css';
import Navbar from "./components/navbar";
import Home from './components/home';
function App() {
  return (
    <div className="container">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
