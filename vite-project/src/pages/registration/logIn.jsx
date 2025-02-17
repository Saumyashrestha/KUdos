/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout";
import { auth } from "../../firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import ForgotPassword from "../../components/forgotPassword/ForgotPassword";

const Login = () => {
  const [loading, setLoading] = useState(false);

  // navigate
  const navigate = useNavigate();

  // User Login State
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const userLoginFunction = async () => {
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All fields are required");
    } else {
      try{
        await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
        window.localStorage.setItem("LoggedIn", "true");
        setLoading(true);
        // Mock login process
        setTimeout(() => {
          setLoading(false);
          if(userLogin.email === "swd.kudos@gmail.com"){
            window.location.href = "/admin";
          }
          else{
          window.location.href = "/homepage";
          }
          toast.success("Logged in successfully");
        }, 1000);
      }
      catch(error){
        console.log(error.message);
        toast.error(error);
      }
    }
  };

  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      userLoginFunction(); 
    }
  };

  const [showPopup, setPopup] = useState(false);

  return (
    <Layout>
      <div className="playfair flex justify-center items-center h-screen">
        {loading && <Loader />}

        {/* Image Section */}
        <div
          className="hidden lg:flex w-2/3 h-full relative bg-cover bg-center"
          style={{
            backgroundImage: "url('/kuimg.jpeg')",
            opacity:0.95
          }}
        >

        </div>

        {/* Login Form Section */}
        <div className="px-8 py-6 shadow-md lg:w-2/3 flex flex-col justify-center items-center h-full">
          {/* Top Heading */}
          <div className="mb-2 text-center">
            <h2 className="text-2xl font-bold text-[#387478]">LOG IN</h2>
            <p className="text-gray-800 mt-2">
              Welcome back to Kathmandu University Domain of Sports! Please enter your details.
            </p>
          </div>

          {/* Email Input */}
          <div className="mb-4 w-full flex justify-center">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={userLogin.email}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  email: e.target.value,
                });
              }}
              className="shadow-md border border-[#387478] px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
            />
          </div>

          {/* Password Input */}
          <div className="mb-5 w-full flex justify-center">
            <input
              type="password"
              placeholder="Password"
              value={userLogin.password}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  password: e.target.value,
                });
              }}
              onKeyDown={handleKeyDown}
              className="shadow-md border border-[#387478] px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
            />
            <div className="playfair absolute right-45 mt-14">
              <button onClick={()=>setPopup(true)} className="text-[#387478] font-semibold text-sm underline underline-offset-2 hover:text-[#52a7ad]">Forgot Password?</button>
              {showPopup && <ForgotPassword onClose={() => setPopup(false)}/>}    
            </div>
          </div>

          {/* Login Button */}
          <div className="mb-5 w-full flex justify-center mt-8">
            <button
              type="button"
              onClick={userLoginFunction}
              className="shadow-md bg-[#387478] hover:bg-[#52a7ad] w-96 text-white text-center py-2 font-semibold rounded-md"
            >
              LOG IN
            </button>
            <ToastContainer position="top-center"/>
          </div>

          {/* Divider with lines */}
          <div className="flex items-center justify-center my-3 w-96">
            <div className="border-t border-gray-400 flex-grow mr-2"></div>
            <div className="text-center text-sm text-gray-600">or</div>
            <div className="border-t border-gray-400 flex-grow ml-2"></div>
          </div>

         

          {/* Signup Link */}
          <div>
            <h2 className="text-black">
              Don't have an account?
              <Link
                className="text-[#387478] hover:text-[#52a7ad] underline underline-offset-2 ml-1"
                to={"/signup"}
              >
                Signup
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
