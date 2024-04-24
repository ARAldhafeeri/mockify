import React, { useEffect } from "react"; 
import { logout } from "utils/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES_NAMES } from "constants/routes";


const Logout : React.FC = () => {
    useEffect( () => {
        logout();
    }, [])
    return  <Navigate to={ROUTES_NAMES.ROOT} />
}

export default Logout;