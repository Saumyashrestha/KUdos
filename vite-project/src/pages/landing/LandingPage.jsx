import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="relative h-screen w-full">
            {/* Hero Image */}
            <img className="top-0 left-0 h-full w-full object-cover" src="./heroimg.png" alt="image" />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-start p-8 text-white bg-black bg-opacity-50 ">
                <div className="w-2/3">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Welcome to Kathmandu University Domain of Sports
                </h1>
                <p className="text-lg md:text-xl mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </p>
                <p className="text-lg md:text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="flex space-x-4">
                        <Link to="/login">
                            <button className="px-6 py-2 mt-6 bg-[#387478] hover:bg-[#52a7ad] text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105">
                                LOG IN
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="px-6 py-2 mt-6 bg-[#387478] hover:bg-[#52a7ad] text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105">
                                SIGN UP
                            </button>
                        </Link>
                    </div>
            </div>
            </div>
           
        </div>
    );
};

export default LandingPage;