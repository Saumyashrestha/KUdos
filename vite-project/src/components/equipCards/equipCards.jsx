import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';

const EquipCards = () => {
    const [equips, setEquips] = useState([{src: "https://media.istockphoto.com/id/497096562/photo/soccer-ball.jpg?s=1024x1024&w=is&k=20&c=x3ObXWN26M1AV-21waU7CmR8OXuSm6NIfSQut5fExU0=",
        alt: "Image of football",
        des: "Football",
        availableQuantity: 5
       },
       {src: "https://media.istockphoto.com/id/172147072/photo/standard-basketball-on-white-surface.jpg?s=1024x1024&w=is&k=20&c=2nhBuhLc8g854djEChmDNRD8twefEn9SGq1QbD8yjYo=",
        alt: "Image of basketball",
        des: "Basketball",
        availableQuantity: 3
       },
       {src: "https://media.istockphoto.com/id/618341990/photo/volleyball-ball-isolated-on-white-background.jpg?s=1024x1024&w=is&k=20&c=Ecm_dXYy2kFwbQa7C2TBLA67odrKNXRfCIVMI0xVLVs=",
        alt: "Image of volleyball",
        des: "Volleyball",
        availableQuantity: 4
       },
       {src: "https://media.istockphoto.com/id/493759086/photo/close-up-of-a-cricket-ball.jpg?s=1024x1024&w=is&k=20&c=9RWSVlrPShvX8ybXqmK95VdWKI_iISDLc8jmD-TBi2Y=",
        alt: "Image of cricket ball",
        des: "Cricket ball",
        availableQuantity: 10
       },
       {src: "https://media.istockphoto.com/id/505125296/photo/wooden-cricket-bat-and-ball-on-a-white-background.jpg?s=1024x1024&w=is&k=20&c=86gmxW-qW3WJmfQL97a6Wr6PgOWopUfWIIVEbDf0okY=",
        alt: "Image of cricket bat",
        des: "Cricket bat",
        availableQuantity: 5
       },
       {src: "https://media.istockphoto.com/id/115036390/photo/racket-and-shuttlecock-badminton.jpg?s=1024x1024&w=is&k=20&c=9aDLB00dcZEftxcegmPxnZsg-X62wRsXclcR4RHTecw=",
        alt: "Image of badminton racket",
        des: "Badminton racket",
        availableQuantity: 5
       },
       {src: "https://media.istockphoto.com/id/496600897/photo/table-tennis.jpg?s=1024x1024&w=is&k=20&c=qZp9p8fgIFpamNt05ZaF0ciJXNseR76VVd3l1RZhihs=",
        alt: "Image of table tennis",
        des: "Table tennis",       
        availableQuantity: 5
       },
       {src: "https://media.istockphoto.com/id/1133952615/photo/top-view-old-goalkeeper-gloves-and-dilapidated-isolated-on-white-background-with-clipping-path.jpg?s=1024x1024&w=is&k=20&c=1efkb2PrmuU-8t0k1CT97Gk47ZbOj5i3WA6BuRGj05U=",
        alt: "Image of goalkeeper gloves",
        des: "Goalkeeper gloves",        
        availableQuantity: 5
       },
       {src: "https://media.istockphoto.com/id/184946816/photo/keeping-gloves.jpg?s=1024x1024&w=is&k=20&c=iwb6MNRrLj0il1DdV58GtHbbucxucaQOsseOnZPygGQ=",
        alt: "Image of wicket keeping gloves",
        des: "Wicket keeping gloves",
        availableQuantity: 5
       },
       {src: "https://media.istockphoto.com/id/172285390/photo/cricket-stumps.webp?s=612x612&w=is&k=20&c=wmfQ4kjWrsrdgzFMAjSgfwwXnzuHDuaK4DfxwCKueRI=",
        alt: "Image of wicket",
        des: "Wicket",     
        availableQuantity: 5
       }])
    

    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');

    const updateEquipQuantity = (itemDes, quantityChange) => {
        setEquips(equips.map(equip => {
            if (equip.des === itemDes) {
                return {
                    ...equip,
                    availableQuantity: equip.availableQuantity - quantityChange
                };
            }
            return equip;
        }));
    };

    const addToCart = (item) => {
        if (!cartItems.find(cartItem => cartItem.des === item.des)) {
            updateEquipQuantity(item.des, 1);
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (item) => {
        const cartItem = cartItems.find(ci => ci.des === item.des);
        if (cartItem) {
            // Increase available quantity by the cart item's quantity
            updateEquipQuantity(item.des, -cartItem.quantity);
        }
        setCartItems(cartItems.filter(cartItem => cartItem.des !== item.des));
        setError('');
    };


    const updateQuantity = (item, increment) => {
        setCartItems(cartItems.map(cartItem => {
            if (cartItem.des === item.des) {
                const newQuantity = increment 
                    ? cartItem.quantity + 1 
                    : Math.max(1, cartItem.quantity - 1);
                
                const equip = equips.find(e => e.des === item.des);
                const currentAvailable = equip.availableQuantity;
                
                if (increment) {
                    // Check if we can increment
                    if (currentAvailable === 0) {
                        setError(`No more ${item.des}(s) available`);
                        return cartItem;
                    }
                    // Decrease available quantity by 1
                    updateEquipQuantity(item.des, 1);
                } else {
                    // Increase available quantity by 1 when decreasing cart quantity
                    if (cartItem.quantity > newQuantity) {
                        updateEquipQuantity(item.des, -1);
                    }
                }
                
                setError('');
                return { ...cartItem, quantity: newQuantity };
            }
            return cartItem;
        }));
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
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-lg font-semibold text-[#387478]">{item.des}</h3>
                                    <span className="text-sm text-gray-600">Available: {item.availableQuantity}</span>
                                </div>
                                <button
                                    onClick={() => addToCart(item)}
                                    disabled={cartItems.some(cartItem => cartItem.des === item.des) || item.availableQuantity === 0}
                                    className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 ${
                                        cartItems.some(cartItem => cartItem.des === item.des) || item.availableQuantity === 0
                                        ? 'bg-gray-400 text-white cursor-not-allowed'
                                        : 'bg-white text-[#387478] border-2 border-[#387478] hover:bg-[#387478] hover:text-white'
                                    }`}
                                >
                                    <ShoppingCart size={20} />
                                    {cartItems.some(cartItem => cartItem.des === item.des) 
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
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-16 h-16 rounded-md object-cover"
                                />
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-[#387478]">{item.des}</h3>
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
                            <button className="w-full bg-[#387478] text-white py-3 rounded-lg hover:bg-[#2c5a5d] transition-colors duration-300">
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