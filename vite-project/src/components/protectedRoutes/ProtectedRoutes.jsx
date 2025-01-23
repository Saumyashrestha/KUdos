import { React } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute(){
    const isLoggedIn = window.localStorage.getItem("LoggedIn") === "true";
    if(isLoggedIn===true){
        return <Outlet/>
    }
    else{
        return <Navigate to="/login"/>
    }
}

export default ProtectedRoute;