import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "redux/features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { RootState } from "redux/store";


const AuthController : any = () => {
  const { auth } = useSelector((state : RootState) => state.auth);
  const [data, setData] = React.useState({
    username: "",
    password: "",

  });

  const dispatch = useDispatch();

  const handleChange = (e : any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  };
 
  return {
    data,
    handleChange,
    login, 
    auth,
  };
}

export default AuthController;