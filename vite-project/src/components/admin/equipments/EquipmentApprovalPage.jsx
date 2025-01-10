import React, { useState, useEffect } from 'react';
import { Card } from '../../card/card';
import { db, doc, collection, getDocs,getDoc, updateDoc ,query , where} from '../../../firebase/FirebaseConfig';
import { CheckCircle, XCircle, Package2, Calendar, User2, Shield } from 'lucide-react';
import { format } from 'date-fns';
import Layout from '../../layout/Layout';


const EquipmentApprovalPage = () => {
  const [equipmentRequests, setEquipmentRequests] = useState([]);

  useEffect(() => {
    const fetchEquipmentRequests = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, 'requestedEquipment'), where('status', '==', 'Pending'))
        );
  
        const requests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEquipmentRequests(requests);
      } catch (error) {
        console.error('Error fetching equipment requests:', error);
      }
    };
  
    fetchEquipmentRequests();
  }, []);
  
  const handleApproval = async (id, action, approvedQuantity) => {
    try {
      if (!id) {
        throw new Error('Invalid request ID');
      }
  
      const requestDocRef = doc(db, 'requestedEquipment', id);
      const requestSnapshot = await getDoc(requestDocRef);
  
      if (!requestSnapshot.exists()) {
        throw new Error('Request document does not exist');
      }
  
      const requestData = requestSnapshot.data();
  
      // Handle the approval of the request
      if (action === 'Approved') {
        // Fetch the equipment based on its name
        const equipmentQuerySnapshot = await getDocs(
          query(collection(db, 'equipment'), where('name', '==', requestData.name))
        );
  
        if (equipmentQuerySnapshot.empty) {
          throw new Error('Equipment not found');
        }
  
        const equipmentDoc = equipmentQuerySnapshot.docs[0];
        const equipmentData = equipmentDoc.data();
  
        // Check if availableQuantity is enough
        if (equipmentData.availableQuantity >= approvedQuantity) {
          const newQuantity = equipmentData.availableQuantity - approvedQuantity;
  
          if (newQuantity >= 0) {
            // Update the equipment quantity in the 'equipment' collection
            await updateDoc(equipmentDoc.ref, { availableQuantity: newQuantity });
  
            // Update the request status to 'Approved' and set the approved quantity
            await updateDoc(requestDocRef, { status: 'Approved', approvedQuantity });
  
            // Update the local state with the new status and quantity
            setEquipmentRequests(prevRequests =>
              prevRequests.map(request =>
                request.id === id
                  ? { ...request, status: 'Approved', approvedQuantity }
                  : request
              )
            );
          } else {
            console.error('Not enough equipment available for approval.');
          }
        } else {
          // Show alert when equipment is out of stock
          alert('The requested equipment is out of stock.');
        }
      } else if (action === 'Rejected') {
        // Remove the equipment request from the 'requestedEquipment' collection
        await deleteDoc(requestDocRef);
  
        // Update the local state to remove the request
        setEquipmentRequests(prevRequests =>
          prevRequests.filter(request => request.id !== id)
        );
      }
  
    } catch (error) {
      console.error('Error updating request or equipment:', error);
    }
  };
  
  
  


  return (
    <Layout> <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-8">
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-teal-100">
        <div className="flex items-center space-x-4">
          <Shield className="h-10 w-10 text-teal-600" />
          <div>
            <h1 className="text-4xl font-bold bg-teal-600  bg-clip-text text-transparent">
              Equipment Requests
            </h1>
            <p className="text-gray-600 mt-2">
              Review and manage equipment requests efficiently
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {equipmentRequests.map((request) => {
          // Ensure the timestamp is properly formatted before rendering
          const formattedDate = format(request.timestamp.toDate(), "dd MMM yyyy, hh:mm:ss a");

          return (
            <Card key={request.id} className="bg-white overflow-hidden hover:shadow-2xl transition-all duration-300 border-0">
              <div className="h-2 bg-teal-500 to-blue-500" />
              <div className="flex md:flex-row flex-col">
                <div className="md:w-1/3 relative">
                  <img
                    src={request.imageUrl}
                    alt={request.name}
                    className="w-full h-full object-cover min-h-[200px]"
                  />
                  {request.status !== 'Pending' && (
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {request.status}
                    </div>
                  )}
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Package2 className="h-6 w-6 text-teal-600" />
                    {request.name}
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <User2 className="h-5 w-5 text-teal-600" />
                      <div>
                        <p className="text-sm text-gray-500">Requester</p>
                        <p className="font-medium text-gray-900">{request.requestedBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <Calendar className="h-5 w-5 text-teal-600" />
                      <div>
                        <p className="text-sm text-gray-500">Requested Date</p>
                        <p className="font-medium text-gray-900">{formattedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <Package2 className="h-5 w-5 text-teal-600" />
                      <div>
                        <p className="text-sm text-gray-500">Quantity Requested</p>
                        <p className="font-medium text-gray-900">{request.quantity} items</p>
                      </div>
                    </div>
                  </div>
                  {request.status === 'Pending' ? (
                    <div className="space-y-4">
                      <input
                        type="number"
                        min="1"
                        max={request.quantity}
                        value={request.approvedQuantity}
                        onChange={(e) =>
                          setEquipmentRequests(prevRequests =>
                            prevRequests.map(r =>
                              r.id === request.id
                                ? { ...r, approvedQuantity: parseInt(e.target.value) }
                                : r
                            )
                          )
                        }
                        className="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Qty"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            handleApproval(request.id, 'Approved', request.approvedQuantity)
                          }
                          disabled={request.approvedQuantity === 0}
                          className="flex-1 flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleApproval(request.id, 'Rejected', 0)}
                          className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">
                        Request {request.status.toLowerCase()}
                        {request.status === 'Approved' &&
                          ` (${request.approvedQuantity} items)`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  </div></Layout>
   
  );
};

export default EquipmentApprovalPage;
