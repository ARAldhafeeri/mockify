import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "redux/features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { RootState } from "redux/store";


const AuthController : any = () => {
  const { auth } = useSelector((state : RootState) => state.auth);
  
  return {
    auth,
  };
}

export default AuthController;