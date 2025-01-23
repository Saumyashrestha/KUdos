
import { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/FirebaseConfig";
import { setDoc, doc } from "firebase/firestore";

import ClubsDropdown from "../../components/clubsdropdown/ClubsDropDown";

const Signup = () => {
    const navigate = useNavigate();
    // State to manage loading and signup fields
    const cloudName = 'dt4rt3krq';  // Cloudinary cloud name
    const [loading, setLoading] = useState(false);
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        club: "",
    });
    const [dropMenu, showDropMenu] = useState(false);

    /**========================================================================
     *                          User Signup Function 
    *========================================================================**/


    const updateUserField = (field, value) => {
        setUserSignup((prevState) => ({
            ...prevState, 
            [field]: value,
        }));
    };


    const handleClubSelection = (club) => {
        setUserSignup({ ...userSignup, club:club });
      };

    //   const handleFileUpload = async (e) => {
    //     const file = e.target.files[0];
    //     if (!file) return; 
    
    //     // Prepare the form data for Cloudinary upfload
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('upload_preset', 'ml_default');
    
    //     try {
    //         // Upload the file to Cloudinary
    //         const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    //             method: 'POST',
    //             body: formData,
    //         });
    
    //         const data = await response.json();
    //         const ClubLogoUrl = data.url;
    //         console.log(ClubLogoUrl);
    
    //         if (data.url) {
    //             console.log('File uploaded successfully:', data.url);
    
                
    //             updateUserField('clubLogo', ClubLogoUrl);
    //         } else {
    //             console.error('Failed to upload file:', data);
    //         }
    //     } catch (error) {
    //         console.error('Error uploading file:', error);
    //     }
    // };
    
    useEffect(() => {
        console.log('Updated userSignup:', userSignup);
    }, [userSignup.clubLogo]); 



    const userSignupFunction = async () => {
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
        
        try{
            await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password)
            const user = auth.currentUser;
            //console.log(user);
            if(user){
                await setDoc(doc(db, "Users", user.uid),{
                    Name: userSignup.name,
                    Email: userSignup.email,
                    Club: userSignup.club,
                    Role: "Student"
                })
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
            window.location.href = "/login";
        }
        catch(error){
            console.log(error.message);
            setLoading(true);
            // Simulate signup delay
            setTimeout(() => {
                setLoading(false);
                toast.success("Signed Up Failed");
                setUserSignup({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
            }, 1000);
        }
    };

    return (
        <Layout>
            <div className="playfair flex justify-center items-center h-screen">
                {loading && <Loader />}
                <div
                    className="hidden lg:flex w-2/3 h-full relative bg-cover bg-center bg-opacity-40"
                    style={{ backgroundImage: "url('/kuimg.jpeg')", opacity: 0.95 }}
                ></div>
                <div className="login_Form px-8 py-6 lg:w-2/3 flex flex-col justify-center items-center h-full shadow-md">
                    <div className="mb-2 text-center">
                        <h2 className="text-2xl font-semibold text-[#387478]">SIGN UP</h2>
                        <p className="text-gray-800 mt-2">
                            Welcome to Kathmandu University Domain of Sports! Please enter your
                            details.
                        </p>
                    </div>

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
                    <div className="mb-5">
                        <div className="flex items-center space-x-3">
                            <p className="text-gray-800">Are you part of a Club?</p>
                            <button
                                onClick={() => showDropMenu(true)}
                                className="text-[#387478] hover:text-[#52a7ad] underline"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => showDropMenu(false)}
                                className="text-[#387478] hover:text-[#52a7ad] underline"
                            >
                                No
                            </button>
                            {dropMenu && (
                                <ClubsDropdown onSelectClub={handleClubSelection} 
                                />
                            )}
                        </div>
                        {/* {dropMenu && (
                            <div className="mt-3">
                                <input
                                    type="file"
                                    onChange={handleFileUpload}
                                    className="text-gray-800"
                                />
                            </div>
                        )} */}
                    </div>

                    <div className="mb-5 w-full flex justify-center mt-4">
                        <button
                            type="button"
                            onClick={userSignupFunction}
                            className="bg-[#387478] hover:bg-[#52a7ad] shadow-md w-96 text-white text-center py-2 font-semibold rounded-md"
                        >
                            SIGN UP
                        </button>
                        <ToastContainer position="top-center"/>
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

