import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <div className="relative">
            {/* Hero Image */}
            <img className="h-60 w-full lg:h-auto lg:max-h-128 object-cover" src="./heroimg.png" alt="image" />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-start p-8 text-white bg-black bg-opacity-30 ">
                <div className="w-2/3">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Welcome to Kathmandu University
                </h1>
                <p className="text-lg md:text-xl mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </p>
                <p className="text-lg md:text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            </div>
        </div>
    );
};

export default HeroSection;
