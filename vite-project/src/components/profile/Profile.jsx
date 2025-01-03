import React from "react";
import { X } from "lucide-react";

function Profile({onClose}){
    const profileRef = useRef();
    const closeProfile = (e) => {
        if(profileRef.current === e.target){
            onClose();
        }
    }
    return(
        <div ref={profileRef} onClick={closeProfile} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-5 text-white">
                <button onClick={onClose} className="place-self-end"><X size={30}/></button>
                <div className="bg-indigo-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-3xl font-extrabold">Profile</h1>
                    <p className="text-3xl font-bold max-w-md text-center"></p>

                </div>
            </div>
        </div>
    )
}

export default Profile