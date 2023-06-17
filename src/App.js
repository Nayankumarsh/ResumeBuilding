// import logo from './logo.svg';
import './App.css';
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from './Pages/Home';
import Cart from './Pages/Cart';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
    </div>
  );
}

export default App;
