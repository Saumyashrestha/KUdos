import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';



const Navbar = () => {
    // navList Data
    const navList = (
        <ul className="flex space-x-24 text-black font-medium text-md ">
            {/* Home */}
            <li>
                <Link to={'/'} className="hover:text-[#387478]">HOME</Link>
            </li>

            {/* All Product */}
            <li>
                <Link to={'/allproduct'} className="hover:text-[#387478]">HISTORY</Link>
            </li>

            {/* Signup */}
            <li>
                <Link to={'/signup'} className="hover:text-[#387478]">LOGIN</Link>
            </li>

            {/* User */}
            <li>
                <Link to={'/login'} className="hover:text-[#387478]">SIGNUP</Link>
            </li>

            {/* Admin */}
            <li>
                <Link to={'/'} className="hover:text-[#387478]">MESSAGE</Link>
                
            </li> 
            <li>
                <i className="fas fa-user-circle ml-2 fa-lg hover:text-[#387478]" />
            </li>
        </ul>
    )

    return (
        <nav className="bg-[#f2f0ef] shadow-md sticky z-50 top-0">
            {/* main  */}
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
                {/* left  */}
                <div className="playfair flex items-center py-3 lg:py-0">
                    <Link to={'/'}>
                        <h2 className="font-bold text-[#387478] text-2xl">KUdos</h2>
                    </Link>
                    <div className="ml-6"> {/* Add margin to separate KUdos from the navList */}
                        {navList}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

