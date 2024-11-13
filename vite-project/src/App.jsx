import{
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Equipments from "./pages/equipments/Equipments";
import Signup from "./pages/registration/signUp";
import Login from "./pages/registration/logIn";

import './App.css';

const App = () => {
  return(
    <div className="playfair" >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/*" element={<Equipments/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default  App; 
