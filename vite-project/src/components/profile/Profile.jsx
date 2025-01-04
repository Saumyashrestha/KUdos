import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/FirebaseConfig";

function Profile({onClose}) {

    const [userDetails, setUserDetails] = useState(null);

    const fetchUserData = async() => {
        auth.onAuthStateChanged(async (user) => {
            const docRef = doc(db, "Users", user.email);
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

    function handleLogout() {
        try {
            auth.signOut;
            window.location.href = "/login";
        } catch (error) {
            console.error("Error logging out: ", error);
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
                            <div>
                                <p>Name: {userDetails.Name}</p>
                                <p>Email: {userDetails.Email}</p>
                            </div>
                            <button onClick={handleLogout()} className="w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 bg-[#387478]">Logout</button>
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