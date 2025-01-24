import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import { db, collection, getDocs, doc } from '../../firebase/FirebaseConfig';
import { 
  Card, 
  CardHeader,
  CardTitle, 
  CardContent
} from '../../components/card/card'; 
import { 
  Users,
  UserPlus,
  ShieldCheck,
  Dumbbell,
  Calendar,
  Trophy,
  
} from 'lucide-react';
import Layout from '../../components/layout/Layout';

const AdminDashboard = () => {

 
  const [inactiveCoordinators, setInactiveCoordinators] = useState(0);
  const [activeCoordinators, setActiveCoordinators] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [Equipment, setEquipment] = useState(0);
  const [EquipmentCount, setEquipmentCount] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch active coordinators from Firestore
    const fetchActiveCoordinators = async () => {
      const coordinatorsRef = collection(db, "coordinator"); // Assuming "coordinators" is your Firestore collection
      const coordinatorsSnapshot = await getDocs(coordinatorsRef);
      const InactiveCount = coordinatorsSnapshot.docs.filter(doc => doc.data().status === "Inactive").length;
      const activeCount = coordinatorsSnapshot.docs.filter(doc => doc.data().status === "Active").length;
      setActiveCoordinators(activeCount);
      setInactiveCoordinators(InactiveCount);
    };

    const fetchActiveUsers = async () => {
      const UsersRef = collection(db, "Users"); // Assuming "coordinators" is your Firestore collection
      const UsersSnapshot = await getDocs(UsersRef);
      
      const activeCount = UsersSnapshot.docs.filter(doc => doc.data()).length;
      setActiveUsers(activeCount);
    };

    const fetchEquipment = async () => {
      const EquipmentRef = collection(db, "requestedEquipment"); 
      const EquipmentSnapshot = await getDocs(EquipmentRef);
      
      const activeCount = EquipmentSnapshot.docs.filter(doc => doc.data()).length;
      setEquipment(activeCount);
    };


    const fetchRequestedEquipment = async () => {
      const EquipmentRefs = collection(db, "equipment"); 
      const EquipmentSnapshots = await getDocs(EquipmentRefs);
      
      const Count = EquipmentSnapshots.docs.filter(doc => doc.data()).length;
      setEquipmentCount(Count);
    };


    const fetchEvents = async() => {
       try {
          const querySnapshot = await getDocs(collection(db, "activeEvents"));
          const docsData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }));
          setEvents(docsData);
          console.log("Fetched events: ", docsData);
        } catch (error) {
          console.error("Error fetching documents: ", error);
        }
    }

    fetchActiveUsers();
    fetchEquipment();
    fetchActiveCoordinators();
    fetchEvents();
    fetchRequestedEquipment();
    
  }, []); // Empty dependency array to run this effect once on mount


  return (
    <Layout> <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
    {/* Top Navigation Bar */}
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <ShieldCheck className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sports Management Admin</h1>
          <p className="text-sm text-gray-500">Welcome back, Administrator</p>
        </div>
      </div>
      
    </div>

    {/* Quick Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Wrapping each card with Link to make it pressable */}
      
        <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-800">{activeUsers}</h3>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-4 text-xs text-green-600">
              +12% from last month
            </div>
          </CardContent>
        </Card>
   

      <Link to="/coordinator">
        <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Coordinators</p>
                <h3 className="text-2xl font-bold text-gray-800">{activeCoordinators}</h3>
              </div>
              <UserPlus className="h-8 w-8 text-purple-500" />
            </div>
            <div className="mt-4 text-xs text-purple-600">
           {inactiveCoordinators} coordinators are  Inactive
</div>

          </CardContent>
        </Card>
      </Link>

      <Link to="/addequipment">
        <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Equipment Items</p>
                <h3 className="text-2xl font-bold text-gray-800">{Equipment}</h3>
              </div>
              <Dumbbell className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-4 text-xs text-purple-600">
            {EquipmentCount} type of equipment available
</div>


          </CardContent>
        </Card>
      </Link>

      <Link to="/eventdetails">
        <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Requested Events</p>
                <h3 className="text-2xl font-bold text-gray-800">{events.length}</h3>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-4 text-xs text-purple-600">
  {events.filter(event => event.status === "active").length} events approved
</div>

          </CardContent>
        </Card>
      </Link>
    </div>

    {/* Main Content Area */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">{event.eventName}</p>
                    <p className="text-sm text-gray-500">{event.startDate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    event.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                    event.status === 'active' ? 'bg-green-100 text-green-800' :
                    event.status === 'live' ? 'bg-blue-100 text-blue-800':
                    'bg-gray-100 text-gray-800'  // Default case
                  }`}>
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-green-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { icon: UserPlus, text: "Add New Coordinator", color: "text-blue-500", link: "/coordinator" },
                { icon: Dumbbell, text: "Equipment Check-out", color: "text-green-500", link: "/addequipment" },
                // { icon: Activity, text: "Generate Reports", color: "text-purple-500", link: "/generatereports" }
              ].map((action, index) => (
                <Link key={index} to={action.link}>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <action.icon className={`h-5 w-5 ${action.color}`} />
                    <span className="text-sm font-medium text-gray-700">{action.text}</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div></Layout>
   
  );
};

export default AdminDashboard;
