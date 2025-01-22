import React from "react";
import { X } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";

function ForgotPassword({onClose}) {

    const handleSubmit = async(e) => {
      e.preventDefault();
      const emailVal = e.target.email.value;
      sendPasswordResetEmail(auth, emailVal).then(data=>{alert("Check your mail.")}).catch(e=>{alert(e.code)});
      onClose();
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-5 text-black">
                <button onClick={onClose} className="place-self-end text-white"><X/></button>
                <div className="bg-white rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                  <h3 className="text-gray-800 mt-2 font-bold">Forgot Password</h3>
                  <p className="text-gray-800 mt-2 max-w-sm">Please enter your student mail in the input field given below. The link to reset your password will be sent to this email address. Be careful and we will not be responsible for misuse of your account!!!</p>
                  <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col items-center justify-center">
                    <input type="email" name="email" placeholder="Email Address" className="shadow-md border border-[#387478] px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"/><br/>
                    <button className="shadow-md bg-[#387478] hover:bg-[#52a7ad] w-2/4 text-white text-center py-2 font-semibold rounded-md">Send link</button>
                  </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;