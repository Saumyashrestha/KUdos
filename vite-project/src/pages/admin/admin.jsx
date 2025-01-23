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
  Activity,
  Bell
} from 'lucide-react';
import Layout from '../../components/layout/Layout';

const AdminDashboard = () => {
  const [notifications] = useState(3);
  const [activeCoordinators, setActiveCoordinators] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [Equipment, setEquipment] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch active coordinators from Firestore
    const fetchActiveCoordinators = async () => {
      const coordinatorsRef = collection(db, "coordinator"); // Assuming "coordinators" is your Firestore collection
      const coordinatorsSnapshot = await getDocs(coordinatorsRef);
      
      const activeCount = coordinatorsSnapshot.docs.filter(doc => doc.data().status === "Active").length;
      setActiveCoordinators(activeCount);
    };

    const fetchActiveUsers = async () => {
      const UsersRef = collection(db, "Users"); // Assuming "coordinators" is your Firestore collection
      const UsersSnapshot = await getDocs(UsersRef);
      
      const activeCount = UsersSnapshot.docs.filter(doc => doc.data()).length;
      setActiveUsers(activeCount);
    };
    const fetchEquipment = async () => {
      const EquipmentRef = collection(db, "equipment"); // Assuming "coordinators" is your Firestore collection
      const EquipmentSnapshot = await getDocs(EquipmentRef);
      
      const activeCount = EquipmentSnapshot.docs.filter(doc => doc.data()).length;
      setEquipment(activeCount);
    };

    const fetchEvents = async() => {
       try {
          const querySnapshot = await getDocs(collection(db, "activeEvents"));
          const docsData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }));
          setEvents(docsData);
        } catch (error) {
          console.error("Error fetching documents: ", error);
        }
    }

    fetchActiveUsers();
    fetchEquipment();
    fetchActiveCoordinators();
    fetchEvents();
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
      <div className="relative">
        <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
        {notifications > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notifications}
          </span>
        )}
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
            <div className="mt-4 text-xs text-blue-600">
              2 pending approvals
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
            <div className="mt-4 text-xs text-orange-600">
              12 items checked out
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link to="/ongoingtournament">
        <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Tournaments</p>
                <h3 className="text-2xl font-bold text-gray-800">3</h3>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-4 text-xs text-purple-600">
              2 upcoming this week
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
