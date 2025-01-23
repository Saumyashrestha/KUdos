import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { auth, db } from "../../firebase/FirebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <Link to={"/equipmentArroval"} className="hover:text-[#387478]">
          EQUIPMENTS
        </Link>
      </li>
      <li>
        <Link to={"/eventdetails"} className="hover:text-[#387478]">
          EVENT DETAIL
        </Link>
      </li>
      <li>
        <Link to={"/venuebooking"} className="hover:text-[#387478]">
        VENUE
        </Link>
      </li>
    </ul>
  );

  // User Nav Links
  const userNavList = (
    <ul className="lg:flex lg:space-x-10 text-black font-medium text-md space-y-4 lg:space-y-0">
      <li>
        <Link to={"/equipments"} className="hover:text-[#387478]">
          EQUIPMENTS
        </Link>
      </li>
      <li>
        <Link to={"/eventRequestform"} className="hover:text-[#387478]">
          EVENT REQUEST
        </Link>
      </li>
      <li>
        <Link to={"/venuebooking"} className="hover:text-[#387478]">
          VENUE
        </Link>
      </li>
    </ul>
  );

  // Render navList based on user role
  const navList = userDetails?.Role === "Admin" ? adminNavList : userNavList;

  const navigate = useNavigate();
  return (
    <nav className="bg-[#f2f0ef] shadow-md sticky z-50 top-0">
      <div className="flex justify-between items-center py-3 px-8 lg:px-14">
        {/* Logo */}
        <div className="flex items-center">
          <Link to={userDetails?.Role === "Admin" ? "/admin" : "/homepage"}>
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

        <div className="hidden lg:flex items-center space-x-12 mr-4">
          {navList}
          <i onClick={() => navigate("/profile")} className="fas fa-user-circle fa-lg hover:text-[#387478] ml-6" />
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-[#f2f0ef] px-4 pb-4">
          {navList}
          <div className="flex justify-center space-x-6 mt-4">
            <i onClick={() => navigate("/profile")} className="fas fa-user-circle fa-lg hover:text-[#387478]" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
