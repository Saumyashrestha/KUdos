import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

function Profile({onClose}) {

    const [userDetails, setUserDetails] = useState(null);

    const fetchUserData = async() => {
        auth.onAuthStateChanged(async (user) => {
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setUserDetails(docSnap.data());
            }
            else{
                console.log("User is not logged in");
            }
        });
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    async function handleLogout() {
        try {
            await auth.signOut();
            window.location.href = "/login";
        } catch (error) {
            console.error("Error logging out: ", error);
            alert("Error logging out: ",error)
        }
    }

    async function resetpassword() {
        if (userDetails && userDetails.Email) {
          try {
            await sendPasswordResetEmail(auth, userDetails.Email);
            console.log("Password reset email sent to:", userDetails.Email);
            alert("Password reset email has been sent to your email address.");
          } catch (error) {
            console.error("Error sending password reset email: ", error);
            alert("Error sending password reset email. Please try again.");
          }
        } else {
          console.log("Email not available");
          alert("User email not found.");
        }
      }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-5 text-black">
                <button onClick={onClose} className="place-self-end text-white"><X/></button>
                <div className="bg-white rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    {
                        userDetails ? (
                            <>
                            <h3>User Profile</h3>
                            <div className="flex items-center gap-4">

                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#387478] flex justify-center items-center">
                                    <div className="fas fa-user-circle fa-xl transform scale-150"></div>
                                </div>

                                <div>
                                <p>Name: {userDetails.Name}</p>
                                <p>Email: {userDetails.Email}</p>
                                </div>

                            </div>
                            <button onClick={resetpassword} className="w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 bg-[#387478] text-white">Change password</button>
                            <button onClick={handleLogout} className="w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 bg-[#387478] text-white">Logout</button>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;