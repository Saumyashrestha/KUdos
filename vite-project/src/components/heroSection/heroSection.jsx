import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// TextGenerateEffect Component
const TextGenerateEffect = ({ words }) => {
  const wordsArray = words.split(" ");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {wordsArray.map((word, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <div className="playfair flex flex-col md:flex-row justify-between items-center bg-[#F2F0F1]">
      <div className="md:w-2/3 p-8 md:p-16">
        {/* Apply text generation effect to headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#000000] mb-4 " >
          <TextGenerateEffect words="HOME TO KU’s CENTRALIZED SPORTS HUB" />
        </h1>   
    
        {/* Apply text generation effect to paragraph */}
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          <TextGenerateEffect words="KUKUKUKUKUKUKUKUKUKUKUKUKUKUKUKUKUKUKUKUU" />
        </p>

        <Link to="/allproducts">
          <button className="bg-[#000000] text-white px-4 py-2 rounded-full hover:bg-gray-700">
            Shop Now
          </button>
        </Link>

        {/* Stats Section */}
        <div className="flex space-x-8 mt-8 items-start">
          {/* First Stat */} 
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-black">10+</h3>
            <p className="text-black">Departments</p>
          </div>

          {/* Divider */}
          <div className="border-l-2 h-12 border-gray-400"></div>

          {/* Second Stat */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-black">30+</h3>
            <p className="text-black">Sports Events</p>
          </div>

          {/* Divider */}
          <div className="border-l-2 h-12 border-gray-400"></div>

          {/* Third Stat */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-black">500+</h3>
            <p className="text-black">Athletes</p>
          </div>
        </div>
      </div>

      <img
        className="md:w-2/3 h-full object-cover sd:order-1 "
        src="src\assets\heroimg.png"
        alt="image_hero_section"
      />
    </div>
  );
};

export default HeroSection;