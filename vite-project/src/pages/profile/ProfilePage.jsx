import React from "react";
import { useState, useEffect } from "react";
import { getDoc, doc, collection, getDocs } from "../../firebase/FirebaseConfig";
import { auth, db } from "../../firebase/FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import Layout from "../../components/layout/Layout";
import moment from 'moment';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [equipmentsReq, setEquipentsReq] = useState([]);

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
    
    const fetchEquipmentReq = async() => {
        auth.onAuthStateChanged(async (user) => {
            try {
                const userdocRef = doc(db, "Users", user.uid);
                const querySnapshot = await getDocs(collection(userdocRef, "Equipments"));
                const docsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setEquipentsReq(docsData);
              } catch (error) {
                console.error("Error fetching documents: ", error);
              }
        })
        };

    useEffect(() => {
        fetchUserData();
        fetchEquipmentReq();
    }, []);

    async function handleLogout() {
        try {
            await auth.signOut();
            window.localStorage.setItem("LoggedIn", "false");
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

      function TimestampDisplay({ timestamp }) {
        if (typeof timestamp === "number" || !isNaN(timestamp)) {
            const date = moment(timestamp * 1000);
            const formattedDate = date.format("MMM DD, hh:mm A");
            return <div>{formattedDate}</div>;
        }
        return <div>Invalid Date Format</div>;
    }
    
    return(
    <Layout>
        <div className="bg-gray-300 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
            { userDetails ? (
                    <>
                    <h3 className="font-bold">User Profile</h3>
                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#387478] flex justify-center items-center">
                            <div className="fas fa-user-circle fa-xl transform scale-150"></div>
                        </div>

                        <div>
                        <p>Name: {userDetails.Name}</p>
                        <p>Email: {userDetails.Email}</p>
                        </div>

                    </div>
                    <button onClick={resetpassword} className="w-auto px-4 py-2 rounded-lg flex items-center justify-center gap-2 bg-[#387478] text-white">Change password</button>
                    <button onClick={handleLogout} className="w-auto px-4 py-2 rounded-lg flex items-center justify-center gap-2 bg-[#387478] text-white">Logout</button>
                    </>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
        <div className="h-5"></div>
        <div className="bg-gray-300 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
            <h3 className="font-bold">Equipments list</h3>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md" border="1">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 text-gray-600">Name</th>
                        <th className="py-2 px-4 text-gray-600">Quantity</th>
                        <th className="py-2 px-4 text-gray-600">Status</th>
                        <th className="py-2 px-4 text-gray-600">Requested date</th>
                    </tr>
                </thead>
                <tbody>
                    {equipmentsReq.length === 0 ? (
                        <tr>
                        <td colSpan="4" className="py-2 px-4 text-center text-gray-500">You haven't borrowed anything yet.</td>
                        </tr>
                    ) : (
                        equipmentsReq.map((doc) => (
                        <tr key={doc.id} className="border-b border-gray-200">
                            <td className="py-2 px-4 text-center text-gray-700">{doc.name}</td>
                            <td className="py-2 px-4 text-center text-gray-700">{doc.quantity}</td> 
                            <td className="py-2 px-4 text-center text-gray-700">{doc.status}</td>
                            <td className="py-2 px-4 text-center text-gray-700"><TimestampDisplay timestamp={doc.timestamp} /></td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </Layout>
    );
}

export default Profile;