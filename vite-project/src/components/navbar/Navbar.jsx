import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Profile from "../profile/Profile";
import { auth, db } from "../../firebase/FirebaseConfig";
import { getDoc, doc } from "firebase/firestore";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfile, setProfile] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("User is not logged in");
        }
      }
    });

    // Cleanup on component unmount
    return () => unsubscribe();
  }, []);

  // Admin Nav Links
  const adminNavList = (
    <ul className="lg:flex lg:space-x-10 text-black font-medium text-md space-y-4 lg:space-y-0">
      <li>
        <Link to={"/equipmentArroval"} className="hover:text-[#f2f0ef]">
        EQUIPMENTS
        </Link>
      </li>
      <li>
        <Link to={"/eventdetails"} className="hover:text-[#f2f0ef]">
          EVENT DETAIL
        </Link>
      </li>
      <li>
        <Link to={"/"} className="hover:text-[#f2f0ef]">
         NOTICE
        </Link>
      </li>
    </ul>
  );

  // User Nav Links
  const userNavList = (
    <ul className="lg:flex lg:space-x-10 text-black font-medium text-md space-y-4 lg:space-y-0">
      <li>
        <Link to={"/equipments"} className="hover:text-[#f2f0ef]">
          EQUIPMENTS
        </Link>
      </li>
      <li>
        <Link to={"/eventRequestform"} className="hover:text-[#f2f0ef]">
         EVENT REQUEST
        </Link>
      </li>
      <li>
        <Link to={"/"} className="hover:text-[#f2f0ef]">
        NOTICE
        </Link>
      </li>
    </ul>
  );

  // Render navList based on user role
  const navList = userDetails?.Role === "Admin" ? adminNavList : userNavList;

  return (
    <nav className="bg-[#387478] shadow-md sticky z-50 top-0">
      <div className="flex justify-between items-center py-3 px-8 lg:px-14">
        {/* Logo */}
        <div className="flex items-center">
        <Link to={userDetails?.Role === "Admin" ? "/admin" : "/homepage"}>
 


            <h2 className="font-bold text-[#f2f0ef] text-2xl">KUdos</h2>
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
          <i className="fas fa-bell fa-lg hover:text-[#f2f0ef] ml-6" />
          <i onClick={() => setProfile(true)} className="fas fa-user-circle fa-lg hover:text-[#f2f0ef] ml-6" />
          {showProfile && <Profile onClose={() => setProfile(false)} />}
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#f2f0ef] px-4 pb-4">
          {navList}
          <div className="flex justify-center space-x-6 mt-4">
            <i className="fas fa-bell fa-lg hover:text-[#f2f0ef]" />
            <i onClick={() => setProfile(true)} className="fas fa-user-circle fa-lg hover:text-[#f2f0ef]" />
            {showProfile && <Profile onClose={() => setProfile(false)} />}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
