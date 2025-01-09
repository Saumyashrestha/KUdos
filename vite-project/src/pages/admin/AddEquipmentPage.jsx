import React, { useState } from 'react';
import { Plus, Edit } from 'lucide-react';

import { db, collection, getDocs, addDoc, updateDoc, doc } from '../../firebase/FirebaseConfig';


const EquipmentManagement = () => {
  
  const [equipment, setEquipment] = useState([
    {
      id: 1,
      name: "Football",
      image: "/football-banner.png",
      available: 5,
      description: "Standard size football"
    },
    {
      id: 2,
      name: "Basketball",
      image: "/football-banner.png",
      available: 3,
      description: "Professional basketball"
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);

  const handleEdit = (equip) => {
    setEditingEquipment(equip);
    setIsEditModalOpen(true);
  };

  const handleUpdateAvailability = (id, newData) => {
    setEquipment(equipment.map(equip => {
      if (equip.id === id) {
        return { ...equip, ...newData };
      }
      return equip;
    }).filter(equip => equip.available > 0));
  };

  const handleAddEquipment = (newEquip) => {
    setEquipment([...equipment, { 
      ...newEquip, 
      id: Date.now(),
      available: parseInt(newEquip.available)
    }]);
    setIsAddModalOpen(false);
  };

  const AddEquipmentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl transform transition-all hover:scale-105 ease-in-out duration-300">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-[#387478] p-3 rounded-full hover:bg-[#52a7ad] transition-all">
            <Plus size={24} className="text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-center text-[#387478] mb-6">Add New Equipment</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleAddEquipment({
              name: formData.get('name'),
              available: formData.get('available'),
              description: formData.get('description'),
              image: "/api/placeholder/400/320", // Add the uploaded image URL here
            });
          }}
          className="space-y-6 text-[#387478]"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Equipment Name</label>
            <input
              required
              name="name"
              type="text"
              placeholder="Enter equipment name"
              className="w-full p-4 border border-[#387478] rounded-lg text-gray-800 focus:ring-2 focus:ring-[#52a7ad] focus:border-[#52a7ad] transition-all transform hover:scale-105"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              required
              name="description"
              placeholder="Enter equipment description"
              className="w-full p-4 border border-[#387478] rounded-lg text-gray-800 focus:ring-2 focus:ring-[#52a7ad] focus:border-[#52a7ad] transition-all transform hover:scale-105"
              rows={3}
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-2">Available Quantity</label>
            <input
              required
              name="available"
              type="number"
              min="1"
              placeholder="Enter quantity"
              className="w-full p-4 border border-[#387478] rounded-lg text-gray-800 focus:ring-2 focus:ring-[#52a7ad] focus:border-[#52a7ad] transition-all transform hover:scale-105"
            />
          </div>
  
          {/* Custom Image Upload */}
          <div className="flex flex-col items-center justify-center mb-4">
            <label className="block text-sm font-medium mb-2">Equipment Image</label>
            <div className="bg-[#387478] hover:bg-[#52a7ad] p-4 w-full border-2 border-[#387478] rounded-lg text-center text-white cursor-pointer transition-all transform hover:scale-105">
              <input
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                id="fileInput"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    document.getElementById('fileLabel').innerText = file.name;
                  }
                }}
              />
              <label htmlFor="fileInput" id="fileLabel" className="text-lg font-semibold">Click to Upload Image</label>
            </div>
          </div>
  
          <div className="pt-4 space-y-4">
            <button
              type="submit"
              className="w-full bg-[#387478] text-white py-3 rounded-lg hover:bg-[#52a7ad] transition-colors font-bold shadow-lg transform hover:scale-105"
            >
              Add Equipment
            </button>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="w-full bg-gray-100 text-[#387478] py-3 rounded-lg hover:bg-gray-200 transition-colors font-bold transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
  // Edit Equipment Modal
  const EditEquipmentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-md transition-transform transform hover:scale-105">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-50 p-3 rounded-full">
            <Edit size={24} className="text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Equipment</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          handleUpdateAvailability(editingEquipment.id, {
            available: parseInt(formData.get('available')),
            description: formData.get('description')
          });
          setIsEditModalOpen(false);
        }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              defaultValue={editingEquipment?.description}
              className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Quantity</label>
            <input
              required
              name="available"
              type="number"
              min="0"
              defaultValue={editingEquipment?.available}
              className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
            >
              Update Equipment
            </button>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="w-full mt-2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#387478]">Equipment Management</h1>
              <p className="text-gray-600 mt-2">Manage your sports equipment inventory</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#387478] text-white rounded-lg hover:bg-[#52a7ad] transition-colors shadow-md"
            >
              <Plus size={20} />
              Add New Equipment
            </button>
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipment.map((equip) => (
            <div key={equip.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden transform hover:scale-105">
              <div className="relative h-48 bg-gray-100">
                <img
                  src={equip.image}
                  alt={equip.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleEdit(equip)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <Edit size={18} className="text-[#387478]" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#387478] mb-2">{equip.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{equip.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                    ${equip.available === 0 ? 'bg-red-100 text-red-800' :
                      equip.available < 3 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'}`}>
                    {equip.available === 0 ? 'Out of Stock' :
                      equip.available < 3 ? `Low Stock: ${equip.available}` :
                        `Available: ${equip.available}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {isAddModalOpen && <AddEquipmentModal />}
      {isEditModalOpen && <EditEquipmentModal />}
    </div>
  );
};

export default EquipmentManagement;
