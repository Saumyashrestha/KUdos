import React, { useState, useEffect } from 'react';
import { Plus, Edit, X, Trash, Package2, Search } from 'lucide-react';
import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from '../../../firebase/FirebaseConfig';
import Layout from "../../layout/Layout";

const EquipmentManagement = () => {
  const cloudName = 'dt4rt3krq';
  const [equipment, setEquipment] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipmentCollection = collection(db, "equipment");
        const equipmentSnapshot = await getDocs(equipmentCollection);
        const equipmentList = equipmentSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setEquipment(equipmentList);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const filteredEquipment = equipment.filter(equip =>
    equip.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uploadImage = async (file) => {
    if (!file) return null;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Cloudinary preset

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data.secure_url || '/api/placeholder/400/320'; // Fallback image
    } catch (error) {
      console.error('Error uploading image:', error);
      return '/api/placeholder/400/320'; // Fallback image in case of error
    }
  };

  const handleAddEquipment = async (newEquip) => {
    const isDuplicate = equipment.some((equip) => equip.name.toLowerCase() === newEquip.name.toLowerCase());
  
    if (isDuplicate) {
      alert('An equipment with this name already exists!');
      return;
    }
    
    const imageUrl = await uploadImage(imageFile);
    
    // After the image upload completes, add the equipment
    const equipmentRef = await addDoc(collection(db, "equipment"), {
      name: newEquip.name,
      availableQuantity: newEquip.availableQuantity,
      image: imageUrl,
    });

    setEquipment([...equipment, { ...newEquip, image: imageUrl }]);
    setIsAddModalOpen(false);
    setImagePreview(null);
    setImageFile(null);
  };

  const handleUpdateEquipment = async (updatedEquip) => {
    let imageUrl = updatedEquip.image; // Keep existing image URL as default

    if (imageFile) {
      imageUrl = await uploadImage(imageFile); // Upload new image if selected
    }

    // Update the equipment details in Firestore
    const equipmentRef = doc(db, "equipment", updatedEquip.id);
    await updateDoc(equipmentRef, {
      name: updatedEquip.name,
      availableQuantity: updatedEquip.availableQuantity,
      image: imageUrl, // Use the updated or existing image URL
    });

    const updatedEquipmentList = equipment.map((equip) =>
      equip.id === updatedEquip.id ? { ...updatedEquip, image: imageUrl } : equip
    );
    setEquipment(updatedEquipmentList);
    setIsAddModalOpen(false);
    setEditingEquipment(null);
    setImagePreview(null);
    setImageFile(null);
  };

  const handleDeleteEquipment = async (equipId) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      const equipmentRef = doc(db, "equipment", equipId);
      await deleteDoc(equipmentRef);
      setEquipment(equipment.filter((equip) => equip.id !== equipId));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };


  const AddEquipmentModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div onClick={e => e.stopPropagation()} className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-lg shadow-2xl transform transition-all duration-500 scale-100 hover:scale-[1.02] border border-[#387478]/20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#387478]">
            {editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}
          </h2>
          <button
            onClick={() => {
              setIsAddModalOpen(false);
              setEditingEquipment(null);
            }}
            className="text-gray-400 hover:text-[#387478] transition-colors rounded-full hover:bg-[#387478]/10 p-2"
          >
            <X size={20} />
          </button>
        </div>

        <form
  onSubmit={async (e) => {
    e.preventDefault();
    const formData = e.target;

    const updatedEquip = {
      id: editingEquipment?.id,
      name: formData.name.value.trim(), // Explicitly read and trim form data
      availableQuantity: parseInt(formData.availableQuantity.value, 10),
      image: editingEquipment?.image || imagePreview, // Default to existing image or preview
    };

    if (imageFile) {
      // Wait for image upload to complete
      updatedEquip.image = await uploadImage(imageFile);
    }

    // Call the appropriate function
    if (editingEquipment) {
      await handleUpdateEquipment(updatedEquip);
    } else {
      await handleAddEquipment(updatedEquip);
    }
  }}
  className="space-y-6"
>

          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Name</label>
              <input
                type="text"
                name="name"
                defaultValue={editingEquipment?.name}
                required
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#387478]/20 focus:border-[#387478] transition-all bg-white/50 backdrop-blur-sm"
                placeholder="Enter equipment name"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Quantity</label>
              <input
                type="number"
                name="availableQuantity"
                defaultValue={editingEquipment?.availableQuantity}
                required
                min="0"
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#387478]/20 focus:border-[#387478] transition-all bg-white/50 backdrop-blur-sm"
                placeholder="Enter quantity"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Image</label>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#387478]/20 focus:border-[#387478] transition-all bg-white/50 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#387478] file:text-white hover:file:bg-[#387478]/90"
                />
                
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#387478] text-white py-4 px-6 rounded-2xl hover:bg-[#387478]/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transform"
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
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-[#387478]/20 p-8 mb-8 transform transition-all duration-300 hover:shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h1 className="text-4xl font-bold text-[#387478]">
                  Equipment Management
                </h1>
                <p className="text-gray-600 mt-2 text-lg">Manage your sports equipment inventory with ease</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search equipment..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-[#387478]/20 focus:border-[#387478] transition-all w-full sm:w-64"
                  />
                </div>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center justify-center gap-2 bg-[#387478] text-white px-6 py-3 rounded-2xl hover:bg-[#387478]/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] transform font-semibold"
                >
                  <Plus size={20} />
                  Add New Equipment
                </button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#387478] border-t-transparent"></div>
            </div>
          ) : filteredEquipment.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-[#387478]/20 p-8">
              <Package2 size={64} className="mb-6 text-[#387478]" />
              <p className="text-xl font-semibold text-gray-700">No equipment found</p>
              <p className="text-gray-500 mt-2">Get started by adding your first item</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEquipment.map((equip) => (
                <div
                  key={equip.id}
                  className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-[#387478]/20 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative h-56">
                    <img
                      src={equip.image}
                      alt={equip.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#387478]/80 via-[#387478]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                      <button
                        onClick={() => {
                          setEditingEquipment(equip);
                          setImagePreview(equip.image);
                          setIsAddModalOpen(true);
                        }}
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:bg-[#387478] hover:text-white transition-all duration-300"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteEquipment(equip.id)}
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{equip.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-2 bg-[#387478]/10 text-[#387478] rounded-xl text-sm font-medium backdrop-blur-sm">
                        Quantity: {equip.availableQuantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {isAddModalOpen && <AddEquipmentModal />}
      </div>
    </Layout>
  );
};

export default EquipmentManagement;