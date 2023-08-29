import React from "react";
import { login, logout } from "redux/features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";


const AuthController : any = () => {
  const { auth } = useAppSelector((state) => state.auth);
  const [data, setData] = React.useState({
    username: "",
    password: "",

  });

  const dispatch = useAppDispatch();

  const handleChange = (e : any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  };
 
  return {
    data,
    handleChange,
    dispatch,
    login, 
    auth,
  };
}

export default AuthController;