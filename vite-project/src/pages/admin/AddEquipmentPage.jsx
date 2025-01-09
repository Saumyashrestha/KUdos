import React, { useState, useEffect } from 'react';
import { Plus, Edit, X, Trash } from 'lucide-react';
import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from '../../firebase/FirebaseConfig';
import Layout from "../../components/layout/Layout";

const EquipmentManagement = () => {
  const [equipment, setEquipment] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      const equipmentCollection = collection(db, "equipment");
      const equipmentSnapshot = await getDocs(equipmentCollection);
      const equipmentList = equipmentSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setEquipment(equipmentList);
    };

    fetchEquipment();
  }, []);

  const handleAddEquipment = async (newEquip) => {
    const isDuplicate = equipment.some((equip) => equip.name.toLowerCase() === newEquip.name.toLowerCase());
    
    if (isDuplicate) {
      alert('An equipment with this name already exists!');
      return;
    }
    
    const newEquipmentRef = await addDoc(collection(db, "equipment"), {
      name: newEquip.name,
      availableQuantity: newEquip.availableQuantity,
      image: "/api/placeholder/400/320",
    });
    
    setEquipment([...equipment, { ...newEquip, image: "/api/placeholder/400/320" }]);
    setIsAddModalOpen(false);
  };

  const handleUpdateEquipment = async (updatedEquip) => {
    const equipmentRef = doc(db, "equipment", updatedEquip.id);
    await updateDoc(equipmentRef, {
      name: updatedEquip.name,
      availableQuantity: updatedEquip.availableQuantity,
    });

    const updatedEquipmentList = equipment.map((equip) =>
      equip.id === updatedEquip.id ? updatedEquip : equip
    );
    setEquipment(updatedEquipmentList);
    setIsAddModalOpen(false);
    setEditingEquipment(null);
  };

  const handleDeleteEquipment = async (equipId) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      const equipmentRef = doc(db, "equipment", equipId);
      await deleteDoc(equipmentRef);
      setEquipment(equipment.filter((equip) => equip.id !== equipId));
    }
  };

  const AddEquipmentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            {editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}
          </h2>
          <button
            onClick={() => {
              setIsAddModalOpen(false);
              setEditingEquipment(null);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const updatedEquip = {
              id: editingEquipment?.id,
              name: formData.get('name'),
              availableQuantity: parseInt(formData.get('availableQuantity')),
            };

            editingEquipment ? handleUpdateEquipment(updatedEquip) : handleAddEquipment(updatedEquip);
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Name</label>
            <input
              type="text"
              name="name"
              defaultValue={editingEquipment?.name}
              required
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#387478] focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Quantity</label>
            <input
              type="number"
              name="availableQuantity"
              defaultValue={editingEquipment?.availableQuantity}
              required
              min="0"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#387478] focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#387478] text-white py-3 px-4 rounded-lg hover:bg-[#2c5a5d] transition-all duration-200"
          >
            {editingEquipment ? 'Update Equipment' : 'Add Equipment'}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <Layout>
     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-gray-800">Equipment Management</h1>
                <p className="text-gray-500 mt-2">Manage your sports equipment inventory</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 bg-[#387478] text-white px-6 py-3 rounded-lg hover:bg-[#2c5a5d] transition-all duration-200"
              >
                <Plus size={20} />
                Add New Equipment
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((equip) => (
              <div key={equip.id} className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
                <div className="relative h-48">
                  <img
                    src={equip.image}
                    alt={equip.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <button
                      onClick={() => {
                        setEditingEquipment(equip);
                        setIsAddModalOpen(true);
                      }}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <Edit size={16} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteEquipment(equip.id)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    >
                      <Trash size={16} className="text-red-400" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">{equip.name}</h3>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
  equip.availableQuantity === 0
    ? 'bg-red-50 text-red-600'
    : equip.availableQuantity > 0
    ? 'bg-green-50 text-green-600'
    : ''
}`}>
  {equip.availableQuantity === 0
    ? 'Out of Stock'
    : `Available Quantity: ${equip.availableQuantity}`}
</span>

                </div>
              </div>
            ))}
          </div>
        </div>

        {isAddModalOpen && <AddEquipmentModal />}
      </div>
    </Layout>
  );
};

export default EquipmentManagement;