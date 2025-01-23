import { useNavigate } from "react-router-dom";

const category = [
    { name: 'Football' },
    { name: 'Table Tennis' },
    { name: 'Cricket' },
    { name: 'Basketball' },
    { name: 'Volleyball' },
    { name: 'Badminton' },

];

const SportsCategory = () => {
    const navigate = useNavigate();

    return (
        <div>
            {/* Category Section */}
            <div className="playfair bg-[#387478] flex flex-col py-4">
                {/* Scrollable Container */}
                <div className="flex overflow-x-auto hide-scroll-bar justify-between items-center px-4">
                    {category.map((item, index) => (
                        <div key={index} className="flex items-center flex-grow">
                            {/* Divider before the item */}
                            {index !== 0 && (
                                <div className="border-l-2 border-white h-10"></div>    
                            )}

                            {/* Category Box */}
                            <div
                                onClick={() => navigate(`/football`, { state: { eventType: item.name } })}
                                className="flex justify-center items-center cursor-pointer mx-4 flex-grow"
                            >
                                <h1 className="text-lg lg:text-2xl font-medium text-white text-center transition-all hover:text-gray-400">
                                    {item.name}
                                </h1>
                            </div>

                            {/* Divider after the item */}
                            {index !== category.length - 1 && (
                                <div className="border-l-2 border-white h-10"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Hide Scrollbar Styling */}
            <style dangerouslySetInnerHTML={{ __html: `
                .hide-scroll-bar { 
                    -ms-overflow-style: none;  /* Internet Explorer 10+ */
                    scrollbar-width: none;     /* Firefox */
                }
                .hide-scroll-bar::-webkit-scrollbar { 
                    display: none;             /* Chrome, Safari, Opera */
                }
            ` }} />
        </div>
    );
};

export default SportsCategory;
