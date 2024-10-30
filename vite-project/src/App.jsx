import{
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/noPage/NoPage";
import LogIn from "./pages/registration/logIn";
import './App.css';

const App = () => {
  return(
    <div className="playfair" >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/*" element={<NoPage/>}/>
          <Route path="/login" element={<LogIn/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default  App; 
