/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
//import { signInWithEmailAndPassword } from "firebase/auth";
//import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
// import { collection, onSnapshot, query, where } from "firebase/firestore";
import Layout from "../../components/layout/Layout";

//const Login = () => {
 // const context = useContext(myContext);
  //const { loading, setLoading } = context;

  // navigate
 // const navigate = useNavigate();

  // User Signup State
  //const [userLogin, setUserLogin] = useState({
    //email: "",
    //password: "",
  //});

 // const userLoginFunction = async () => {
  //  if (userLogin.email === "" || userLogin.password === "") {
    //  toast.error("All Fields are required");
    //}

    //setLoading(true);
    //try {
      //const users = await signInWithEmailAndPassword(
        //auth,
        //userLogin.email,
        //userLogin.password
      //);

    //  try {
      //  const q = query(
        //  collection(fireDB, "user"),
          //where("uid", "==", users?.user?.uid)
        //);
      //  const data = onSnapshot(q, (QuerySnapshot) => {
        //  let user;
          //QuerySnapshot.forEach((doc) => (user = doc.data()));
          //localStorage.setItem("users", JSON.stringify(user));
          //setUserLogin({
            //email: "",
            //password: "",
          //});
        //  toast.success("Logged In Successfully");
          //setLoading(false);
          //navigate("/");
          
        //});
    //    return () => data;
     // } catch (error) {
       // console.log(error);
        //setLoading(false);
      //}
    //} catch (error) {
      //console.log(error);
      //setLoading(false);
      //toast.error("Login Failed");
    //}
  //};

  return (
    <Layout>
      <div className="playfair flex justify-center items-center h-screen">
        {loading && <Loader />}

        {/* Image Section */}
        <div
          className="hidden lg:flex w-2/3 h-full relative bg-cover bg-center"
          style={{
            backgroundImage: "url('./hero.png')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <h1 className="text-white text-4xl font-bold">RS Craftmandu</h1>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="px-8 py-6 shadow-md lg:w-2/3 flex flex-col justify-center items-center h-full">
          {/* Top Heading */}
          <div className="mb-2 text-center">
            <h2 className="text-2xl font-bold text-[#dd3333]">Login</h2>
            <p className="text-gray-700 mt-2">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Input One */}
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
              className=" shadow-md border border-[#dd3333] px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
            />
          </div>

          {/* Input Two */}
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
              className=" shadow-md border border-[#dd3333] px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
            />
            <div className=" playfair absolute right-45 mt-14">
              <Link
                to="/forgot-password"
                className="text-[#dd3333] font-semibold text-sm underline underline-offset-2 hover:text-[#f44444]"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Signup Button */}
          <div className="mb-5 w-full flex justify-center mt-8">
            <button
              type="button"
              onClick={userLoginFunction}
              className="shadow-md bg-[#dd3333] hover:bg-[#f44444] w-96 text-white text-center py-2 font-semibold rounded-md"
            >
              LOGIN
            </button>
          </div>

          {/* Divider with lines */}
          <div className="flex items-center justify-center my-3 w-96">
            <div className="border-t border-gray-400 flex-grow mr-2"></div>
            <div className="text-center text-sm text-gray-600">or</div>
            <div className="border-t border-gray-400 flex-grow ml-2"></div>
          </div>
          {/* Google Login Button */}
          <div className="mb-5 mt-4 w-96">
            <button
              type="button"
              className="border border-gray-300 w-full py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
                alt="Google Icon"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </div>

          {/* Signup Link */}
          <div>
            <h2 className="text-black">
              Don't have an account?
              <Link
                className="text-[#dd3333] hover:text-[#f44444]  underline underline-offest-2 ml-1"
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
//};

export default Login;
