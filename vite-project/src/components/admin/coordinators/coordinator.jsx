
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from '../../card/card';
import { 
  UserPlus, 
  Users, 
  Mail, 
  Phone, 
  Building, 
  Award, 
  CheckCircle2, 
  XCircle, 
  ChevronDown 
} from 'lucide-react';
import Layout from '../../layout/Layout';

import { db, collection, getDocs, addDoc, updateDoc, doc } from '../../../firebase/FirebaseConfig';

const CoordinatorManagement = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [coordinators, setCoordinators] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    email: '',
    sport: '',
    department: '',
    phone: '',
  });

  // Fetch Coordinators from Firestore
  useEffect(() => {
    const fetchCoordinators = async () => {
      const querySnapshot = await getDocs(collection(db, "coordinator"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCoordinators(data);
    };

    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    };

    fetchCoordinators();
    fetchUsers();
  }, []);

  // Add Coordinator
  const addCoordinator = async (e) => {
    e.preventDefault();
    const selectedUser = users.find(user => user.Email === form.email);

    if (!selectedUser) {
      alert('Selected user does not exist.');
      return;
    }

    // Check if the user is already a coordinator
    const isCoordinator = coordinators.some(coord => coord.email === form.email && coord.status === 'Active');

    if (isCoordinator) {
      alert('This user is already assigned as a coordinator for another position.');
      return;
    }

    try {
      const newCoordinator = { 
        name: selectedUser.Name,
        email: form.email,
        sport: form.sport,
        department: form.department,
        phone: form.phone,
        status: 'Active',
        createdAt: new Date(),
      };

      // Add the new coordinator to Firestore
      const docRef = await addDoc(collection(db, "coordinator"), newCoordinator);

      // Update the user's role in the Users collection
      const userRef = doc(db, "Users", selectedUser.id);
      await updateDoc(userRef, { Role: 'coordinator' });

      // Update the local state
      setCoordinators(prev => [...prev, { id: docRef.id, ...newCoordinator }]);
      setActiveTab('list');


      setForm({
        email: '',
        sport: '',
        department: '',
        phone: '',
      });
      
    } catch (error) {
      console.error("Error adding coordinator: ", error);
    }
  };

  // Handle Form Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
// Function to get the appropriate status icon based on the status
const getStatusIcon = (status) => {
  switch (status) {
    case 'Inactive':
      return <XCircle className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

// Function to get the appropriate style based on the status
const getStatusStyle = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100';
    
    case 'Inactive':
      return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
  }
};


  // Update Coordinator Status
  const updateStatus = async (coordinatorId, newStatus, newRole) => {
    try {
      const coordinatorRef = doc(db, "coordinator", coordinatorId);
      await updateDoc(coordinatorRef, { status: newStatus });
      
       // Update the user's role in the 'Users' collection
    const userRef = doc(db, "Users", coordinatorId); // Assuming coordinatorId is the same as the user's document ID
    await updateDoc(userRef, { Role: newRole });

      setCoordinators(prev =>
        prev.map(coordinator =>
          coordinator.id === coordinatorId ? { ...coordinator, status: newStatus } : coordinator
        ).filter(coordinator => newStatus !== 'Inactive' || coordinator.status !== 'Inactive')
      );
      setOpenDropdown(null);
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Coordinator Management</h1>
          <p className="text-sm text-gray-500">Manage sports coordinators and applications</p>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeTab === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="h-5 w-5" />
            Active Coordinators
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeTab === 'add'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <UserPlus className="h-5 w-5" />
            Add New Coordinator
          </button>
        </div>

        {activeTab === 'list' ? (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Active Coordinators</CardTitle>
              <CardDescription>
                Showing {coordinators.filter(coordinator => coordinator.status === 'Active').length} active coordinators
              </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
      {coordinators
        .filter(coordinator => coordinator.status === 'Active') // Filter only active coordinators
        .map(coordinator => (
          <div
            key={coordinator.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-lg">{coordinator.name}</h3>
                <p className="text-gray-600">{coordinator.sport} Coordinator</p>
              </div>
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === coordinator.id ? null : coordinator.id)
                  }
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 border transition-all duration-200 ${getStatusStyle(
                    coordinator.status
                  )}`}
                >
                  {getStatusIcon(coordinator.status)}
                  <span>{coordinator.status}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      openDropdown === coordinator.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openDropdown === coordinator.id && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-100 z-10">
                    <div className="py-1">
                      <button
                        onClick={() => updateStatus(coordinator.id, 'Inactive','Student')}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4 text-red-600" />
                        Set as Inactive
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                {coordinator.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                {coordinator.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building className="h-4 w-4" />
                {coordinator.department}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="h-4 w-4" />
                {coordinator.sport}
              </div>
            </div>
          </div>
        ))}
    </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Add New Coordinator</CardTitle>
              <CardDescription>Fill in the details to add a new sports coordinator</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={addCoordinator}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm text-gray-600">
                      User (Email)
                    </label>
                    <select
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="p-2 border rounded-lg text-gray-800"
                      required
                    >
                      <option value="">Select a user</option>
                      {users.filter(user =>  user.Role ==='Student')
                      .map(user=>(<option key={user.id} value={user.Email}>
                        {user.Name} ({user.Email})
                      </option>)
                        
                      )}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="sport" className="text-sm text-gray-600">
                      Sport
                    </label>
                    <input
                      id="sport"
                      name="sport"
                      type="text"
                      value={form.sport}
                      onChange={handleChange}
                      className="p-2 border rounded-lg text-gray-800"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="department" className="text-sm text-gray-600">
                      Department
                    </label>
                    <input
                      id="department"
                      name="department"
                      type="text"
                      value={form.department}
                      onChange={handleChange}
                      className="p-2 border rounded-lg text-gray-800"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
  <label htmlFor="phone" className="text-sm text-gray-600">
    Phone
  </label>
  <input
    id="phone"
    name="phone"
    type="text"
    value={form.phone}
    onChange={handleChange}
    className="p-2 border rounded-lg text-gray-800"
    required
    maxLength={10} // Restricts input to 10 characters
  />
  {form.phone && form.phone.length !== 10 && (
    <p className="text-red-500 text-xs">Phone number must be 10 digits.</p>
  )}
</div>

                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
                  Add Coordinator
                </button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default CoordinatorManagement;




