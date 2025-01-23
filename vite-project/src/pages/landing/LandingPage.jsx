import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightCircle } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden font-playfair-display bg-black">
      {/* Hero Section */}
      <div className="absolute inset-0">
        {/* Hero Image */}
        <img 
          className="h-full w-full object-cover" 
          src="./heroimg.png" 
          alt="Sports at Kathmandu University" 
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="relative h-screen flex items-center z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            {/* Animated Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-in">
              Welcome to Kathmandu University Domain of Sports {' '}
              <span className="text-transparent bg-clip-text bg-teal-00 ">
              Domain of Sports
              </span>{' '}
            
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-300 mb-4 font-light">
              Celebrate sportsmanship and excellence with us!
            </p>
            <p className="text-md md:text-lg text-gray-400 mb-8 leading-relaxed">
              Stay updated with live scores, form teams, manage resources, and join exciting tournaments.
              Together, let's redefine sports at KU!
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/login">
                <button className="group w-full sm:w-auto px-8 py-3 bg-teal-500  hover:from-teal-400 hover:to-green-500 text-white font-semibold rounded-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                  LOG IN
                  <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-full sm:w-auto px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-gray-500 hover:border-white hover:bg-white/10 transition-all duration-300">
                  SIGN UP
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

     
    
    </div>
  );
};

export default LandingPage;
