import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';



const Navbar = () => {
    // navList Data
    const navList = (
        <ul className="flex space-x-24 text-black font-medium text-md ">
           

            {/* All Product */}
            <li>
                <Link to={'/allproduct'} className="hover:text-[#387478]">HISTORY</Link>
            </li>

            {/* Signup */}
            <li>
                <Link to={'/login'} className="hover:text-[#387478]">LOGIN</Link>
            </li>

            {/* User */}
            <li>
                <Link to={'/signup'} className="hover:text-[#387478]">SIGNUP</Link>
            </li>

            {/* Admin */}
            <li>
                <Link to={'/'} className="hover:text-[#387478]">NOTICE</Link>
                
            </li> 
          
        </ul>
    );

    return (
        <nav className="bg-[#f2f0ef] shadow-md sticky z-50 top-0">
            {/* main  */}
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
                {/* left  */}
                <div className="playfair flex items-center py-3 lg:py-0">
                    <Link to={'/homepage'}>
                        <h2 className="font-bold text-[#387478] text-2xl">KUdos</h2>
                    </Link>
                    <div className="ml-6"> {/* Add margin to separate KUdos from the navList */}
                        {navList}
                    </div>
                </div>
                <div className="ml-auto">
                    <i className="fas fa-user-circle fa-lg hover:text-[#387478]" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

