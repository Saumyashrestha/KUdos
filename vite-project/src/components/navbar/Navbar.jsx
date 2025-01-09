import { useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Profile from "../profile/Profile"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfile, setProfile] = useState(false);

  // navList Data
  const navList = (
    <ul className="lg:flex lg:space-x-10 text-black font-medium text-md space-y-4 lg:space-y-0">
      <li>
        <Link to={"/login"} className="hover:text-[#387478]">
          LOGIN
        </Link>
      </li>
      <li>
        <Link to={"/equipments"} className="hover:text-[#387478]">
          EQUIPMENTS
        </Link>
      </li>
      <li>
        <Link to={"/"} className="hover:text-[#387478]">
          NOTICE
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="playfair bg-[#f2f0ef] shadow-md sticky z-50 top-0">
      <div className="flex justify-between items-center py-3 px-8 lg:px-14">
        {/* Logo */}
        <div className="flex items-center">
          <Link to={"/homepage"}>
            <h2 className="font-bold text-[#387478] text-2xl">KUdos</h2>
          </Link>
        </div>

        {/* Hamburger Menu (visible on small screens) */}
        <button
          className="lg:hidden text-[#387478] focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} fa-lg`}></i>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-12 mr-4">
          {navList}
          <i className="fas fa-bell fa-lg hover:text-[#387478] ml-6" />
          <i onClick={()=> setProfile(true)} className="fas fa-user-circle fa-lg hover:text-[#387478] ml-6" />
          {showProfile && <Profile onClose={()=>setProfile(false)}/>}
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#f2f0ef] px-4 pb-4">
          {navList}
          <div className="flex justify-center space-x-6 mt-4">
            <i className="fas fa-bell fa-lg hover:text-[#387478]" />
            <i onClick={()=> setProfile(true)} className="fas fa-user-circle fa-lg hover:text-[#387478]" />
            {showProfile && <Profile onClose={()=>setProfile(false)}/>}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
