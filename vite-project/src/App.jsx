import{
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/noPage/NoPage";
import Equipments from "./pages/equipments/Equipments";
import Signup from "./pages/registration/signUp";
import Login from "./pages/registration/logIn";

import './App.css';
import LandingPage from "./pages/landing/LandingPage";
import ClubHome from "./pages/clubhome/ClubHome";
import Football from "./pages/football/Football";
import OngoingTournament from "./pages/ongoingtournament/ongoingTournament";
import Admin from "./pages/admin/admin"
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddEquipmentPage from "./pages/admin/AddEquipmentPage";
import UpdateEquipmentPage from "./components/admin/UpdateEquipmentPage";
import EditScorePage from "./pages/coordinator/EditScorePage";
import EditTournamentPage from "./pages/coordinator/EditTournamentPage";

const App = () => {
  return(
    <div className="playfair" >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/homepage" element={<HomePage/>}/>
          <Route path="/*" element={<NoPage/>}/> 
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/equipments" element={<Equipments/>}/>
          <Route path="/clubhome" element={<ClubHome/>}/>
          <Route path="/football" element={<Football/>}/>
          <Route path="/ongoingtournament" element={<OngoingTournament/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/addequipment" element={<AddEquipmentPage/>} />
          <Route path="/updateequipment" element={<UpdateEquipmentPage/>} />
          <Route path="/editscore" element={<EditScorePage/>}/>
          <Route path="/edittournament" element={<EditTournamentPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default  App; 
