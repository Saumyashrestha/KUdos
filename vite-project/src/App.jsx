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
import EventDetailsCard from "./pages/admin/AdminDashboard"
import AddEquipmentPage from "./components/admin/equipments/AddEquipmentPage";
import ActiveTournamentsPage from "./components/admin/activetournament";



import EditScorePage from "./pages/coordinator/EditScorePage";
import MyState from "./context/myState";
import CoordinatorManagement from "./components/admin/coordinators/coordinator";
import UserDetail from "./components/admin/UserDetail";
import EquipmentApprovalPage from "./components/admin/equipments/EquipmentApprovalPage";
import EventRequestForm from "./pages/eventRequest/eventRequest";
import EventDetails from "./components/admin/event/eventCard";

import EditTournamentPage from "./pages/coordinator/EditTournamentPage";

const App = () => {
  return(
    <MyState  >
      <div className="playfair">
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
          <Route path="/eventRequestform" element={<EventRequestForm/>}/>

          <Route path="/admin" element={<Admin/>}/>
          <Route path="/admin-dashboard" element={<EventDetailsCard/>}/>
          <Route path="/addequipment" element={<AddEquipmentPage/>} />
          <Route path="/editscore" element={<EditScorePage/>}/>
          <Route path="/coordinator" element={<CoordinatorManagement/>}/>
          <Route path="/equipmentArroval" element={<EquipmentApprovalPage/>}/>
          <Route path="/eventdetails" element={<EventDetails/>}/>


          <Route path="/userdetail" element={<UserDetail/>}/>
          
          <Route path="/ActiveTournamentsPage" element={<ActiveTournamentsPage/>}/>
         
          
       
          <Route path="/edittournament" element={<EditTournamentPage/>}/>
        </Routes>
      </Router>
      </div>  
    </MyState>
  );
}

export default  App; 
