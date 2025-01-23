import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { getAuth } from 'firebase/auth';

import { auth, db, doc, collection, getDoc,getDocs,addDoc } from '../../firebase/FirebaseConfig';

const EquipCards = () => {
    const cloudName = 'dt4rt3krq';
    const [equips, setEquips] = useState([]);
    const [userDetails, setUserDetailsLocal] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEquips = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "equipment"));
                const fetchedEquips = querySnapshot.docs.map(doc => doc.data());
                setEquips(fetchedEquips);
            } catch (error) {
                console.error("Error fetching equipment data:", error);
                setError('Failed to load equipment data');
            }
        };
        fetchEquips();
    }, []);

    const updateEquipQuantity = (itemDes, quantityChange) => {
        setEquips(equips.map(equip => {
            if (equip.name === itemDes) {
                return {
                    ...equip,
                   
                };
            }
            return equip;
        }));
    };

    const addToCart = (item) => {
        if (!cartItems.find(cartItem => cartItem.name === item.name)) {
            updateEquipQuantity(item.name, 1);
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (item) => {
        const cartItem = cartItems.find(ci => ci.name === item.name);
        if (cartItem) {
            updateEquipQuantity(item.name, -cartItem.quantity);
        }
        setCartItems(cartItems.filter(cartItem => cartItem.name !== item.name));
        setError('');
    };

    const updateQuantity = (item, increment) => {
        setCartItems(cartItems.map(cartItem => {
            if (cartItem.name === item.name) {
                const newQuantity = increment 
                    ? cartItem.quantity + 1 
                    : Math.max(1, cartItem.quantity - 1);
                
                const equip = equips.find(e => e.name === item.name);
                const currentAvailable = equip.availableQuantity;
                
                if (increment) {
                    if (currentAvailable === cartItem.quantity) {
                        setError(`No more ${item.name}(s) available`);
                        return cartItem;
                    }
                    updateEquipQuantity(item.name, 1);
                } else {
                    if (cartItem.quantity > newQuantity) {
                        updateEquipQuantity(item.name, -1);
                    }
                }
                
                setError('');
                return { ...cartItem, quantity: newQuantity };
            }
            return cartItem;
        }));
    };

 
    
    const handleSubmitRequest = async () => {
        const Auth = getAuth();
        Auth.onAuthStateChanged(async (user) => {
            const docRef = doc(db, "Users", user?.uid); // Ensure user is authenticated
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserDetailsLocal(docSnap.data()); // Set user details in local state
            } else {
                console.log("User not logged in");
            }
        });
    
        console.log(userDetails);
        // Ensure userDetails is defined before proceeding
        if (userDetails && cartItems.length > 0) {
            try {
                const requestedEquipmentRef = collection(db, "requestedEquipment");
    
                const requestDetails = cartItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    requestedBy: userDetails?.Name, 
                    status: "Pending",
                    timestamp: new Date(),
                }));

                const user = auth.currentUser;
                const userDocRef = doc(db, "Users", user.uid);
                const equipmentCollectionRef = collection(userDocRef, "Equipments");

                for (const request of requestDetails) {
                    // Ensure no undefined fields are added to Firestore
                    if (request.requestedBy) {
                        await addDoc(requestedEquipmentRef, request);
                        await addDoc(equipmentCollectionRef, request);
                    } else {
                        console.log("Missing required fields in request details");
                    }
                }
    
                console.log("Request Details:", requestDetails);
                alert("Request successfully sent!");
    
                setCartItems([]); // Clear the cart after successful submission
            } catch (error) {
                console.error("Error adding document: ", error);
                alert("Failed to send request. Please try again.");
            }
        } else if (!user) {
            alert("You must be logged in to make a request.");
        } else {
            alert("Your cart is empty!");
        }
    };
    
    
    
    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Main Content */}
            <div className="flex-1 px-6 py-8 mr-80">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-[#387478] mb-2">
                            Sports Equipment
                        </h1>
                        <p className="text-gray-600">
                            Select the equipment you need for your activities
                        </p>
                    </div>

                    {/* Equipment Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {equips.map((item, index) => (
                            <div key={index} 
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
                                <div className="relative h-64 overflow-hidden bg-gray-100">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-lg font-semibold text-[#387478]">{item.name}</h3>
                                        <span className="text-sm text-gray-600">Available: {item.availableQuantity}</span>
                                    </div>
                                    <button
                                        onClick={() => addToCart(item)}
                                        disabled={cartItems.some(cartItem => cartItem.name === item.name) || item.availableQuantity === 0}
                                        className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 ${
                                            cartItems.some(cartItem => cartItem.name === item.name) || item.availableQuantity === 0
                                            ? 'bg-gray-400 text-white cursor-not-allowed'
                                            : 'bg-white text-[#387478] border-2 border-[#387478] hover:bg-[#387478] hover:text-white'
                                        }`}
                                    >
                                        <ShoppingCart size={20} />
                                        {cartItems.some(cartItem => cartItem.name === item.name) 
                                            ? 'Added to list'
                                            : item.availableQuantity === 0
                                                ? 'Out of stock'
                                                : 'Add to list'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar Cart */}
            <div className="w-80 fixed right-0 top-0 h-full bg-white shadow-lg border-l border-gray-200 overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-[#387478]">Request List</h2>
                        <span className="bg-[#387478] text-white px-2 py-1 rounded-full text-sm">
                            {cartItems.length}
                        </span>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    {cartItems.length === 0 ? (
                        <div className="text-center py-8">
                            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-500">Your request list is empty</p>
                            <p className="text-gray-400 text-sm mt-2">Add items from the available equipment</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-md object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-[#387478]">{item.name}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() => updateQuantity(item, false)}
                                                className="p-1 rounded-full hover:bg-gray-200"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item, true)}
                                                className="p-1 rounded-full hover:bg-gray-200"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item)}
                                        className="p-1 hover:bg-gray-200 rounded-full"
                                    >
                                        <X size={20} className="text-red-500" />
                                    </button>
                                </div>
                            ))}
                            
                            <div className="pt-4 mt-4 border-t">
                                <p className="text-sm text-gray-600 mb-4">
                                    Items in this list will be requested to the SWD. We will notify you once the request is processed.
                                </p>
                                <button
                                    onClick={handleSubmitRequest}
                                    className="w-full bg-[#387478] text-white py-3 rounded-lg hover:bg-[#2c5a5d] transition-colors duration-300"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EquipCards;
