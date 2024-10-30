import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout";

const Signup = () => {
    // State to manage loading and signup fields
    const [loading, setLoading] = useState(false);
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    /**========================================================================
     *                          User Signup Function 
    *========================================================================**/

    const userSignupFunction = () => {
        // Validation check
        if (
            userSignup.name === "" ||
            userSignup.email === "" ||
            userSignup.password === "" ||
            userSignup.confirmPassword === ""
        ) {
            toast.error("All Fields are required");
            return;
        }

        if (userSignup.password !== userSignup.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        // Simulate signup delay
        setTimeout(() => {
            setLoading(false);
            toast.success("Signed Up Successfully");
            setUserSignup({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
        }, 1000);
    };

    return (
        <Layout>
            <div className="playfair flex justify-center items-center h-screen">
                {loading && <Loader />}

                {/* Image Section */}
                <div
                    className="hidden lg:flex w-2/3 h-full relative bg-cover bg-center bg-opacity-40"
                    style={{ backgroundImage: "url('/kuimg.jpeg')",
                        opacity: 0.95
                     }}
                >
                </div>

                {/* Signup Form */}
                <div className="login_Form px-8 py-6 lg:w-2/3 flex flex-col justify-center items-center h-full shadow-md">
                    {/* Top Heading */}
                    <div className="mb-2 text-center">
                        <h2 className="text-2xl font-semibold text-[#387478]">SIGN UP</h2>
                        <p className="text-gray-800 mt-2">
                            Welcome to Kathmandu University Domain of Sports! Please enter your details.
                        </p>
                    </div>

                    {/* Input Fields */}
                    <div className="mb-4 w-96 flex mt-4 justify-center">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={userSignup.name}
                            onChange={(e) =>
                                setUserSignup({ ...userSignup, name: e.target.value })
                            }
                            className="shadow-md border border-[#387478] px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-5 w-full flex justify-center">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={userSignup.email}
                            onChange={(e) =>
                                setUserSignup({ ...userSignup, email: e.target.value })
                            }
                            className="shadow-md border border-[#387478] px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            type="password"
                            placeholder="Password"
                            value={userSignup.password}
                            onChange={(e) =>
                                setUserSignup({ ...userSignup, password: e.target.value })
                            }
                            className="shadow-md border border-[#387478] px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            type="password"
                            placeholder="Re-Enter Password"
                            value={userSignup.confirmPassword}
                            onChange={(e) =>
                                setUserSignup({ ...userSignup, confirmPassword: e.target.value })
                            }
                            className="shadow-md border border-[#387478] px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
                        />
                    </div>

                    {/* Signup Button */}
                    <div className="mb-5 w-full flex justify-center mt-4">
                        <button
                            type="button"
                            onClick={userSignupFunction}
                            className="bg-[#387478] hover:bg-[#52a7ad] shadow-md w-96 text-white text-center py-2 font-semibold rounded-md"
                        >
                            SIGN UP
                        </button>
                    </div>

                    <div>
                        <h2 className="text-black">
                            Already have an account?{" "}
                            <Link
                                className="text-[#387478] hover:text-[#52a7ad] underline underline-offset-2"
                                to={"/login"}
                            >
                                Login
                            </Link>
                        </h2>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Signup;
