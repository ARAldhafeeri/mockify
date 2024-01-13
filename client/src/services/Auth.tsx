import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";


const AuthService : any = () => {
  const { auth } = useSelector((state : RootState) => state.auth);
  return {
    auth
  };
}

export default AuthService;