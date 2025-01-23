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

import AddEquipmentPage from "./components/admin/equipments/AddEquipmentPage";




import EditScorePage from "./pages/coordinator/EditScorePage";
import MyState from "./context/myState";
import CoordinatorManagement from "./components/admin/coordinators/coordinator";

import EquipmentApprovalPage from "./components/admin/equipments/EquipmentApprovalPage";
import EventRequestForm from "./pages/eventRequest/eventRequest";

import TableTennis from "./pages/tableTennis/TableTennis";

import EditTournamentPage from "./pages/coordinator/EditTournamentPage";
import EditTTPage from "./pages/coordinator/EditTTPage";
import VenueBooking from "./pages/venueBooking/venueBooking";

import Profile from "./pages/profile/ProfilePage";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoutes";
import EventDetails from "./components/admin/event/eventCard";

const App = () => {
  return(
    <MyState  >
      <div className="playfair">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute/>}>

            <Route path="/homepage" element={<HomePage/>}/>
            <Route path="/*" element={<NoPage/>}/> 
            <Route path="/equipments" element={<Equipments/>}/>
            <Route path="/clubhome" element={<ClubHome/>}/>
            <Route path="/football" element={<Football/>}/>
            <Route path="/ongoingtournament" element={<OngoingTournament/>}/>
            <Route path="/eventRequestform" element={<EventRequestForm/>}/>

            <Route path="/admin" element={<Admin/>}/>
            <Route path="/eventdetails" element={<EventDetails/>}/>
           
            <Route path="/addequipment" element={<AddEquipmentPage/>} />
            <Route path="/editscore" element={<EditScorePage/>}/>
            <Route path="/coordinator" element={<CoordinatorManagement/>}/>
            <Route path="/equipmentArroval" element={<EquipmentApprovalPage/>}/>
            
            <Route path="/tabletennis" element={<TableTennis/>}/>
            <Route path="/edittt" element={<EditTTPage/>}/>
            <Route path="/venuebooking" element={<VenueBooking/>}/>


          
            
          
          
            <Route path="/edittournament" element={<EditTournamentPage/>}/>

            <Route path="/profile" element={<Profile/>}/>

          </Route>
        </Routes>
      </Router>
      </div>  
    </MyState>
  );
}

export default  App; 
