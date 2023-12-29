
import './App.css';
import Home from './screens/Home';
import Login from './screens/login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './screens/Signup.js';
import { CartProvider } from './components/ContextReducer.js';

function App() {
  return (
    <CartProvider>
    <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/createuser" element={<Signup/>}/>
        </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
