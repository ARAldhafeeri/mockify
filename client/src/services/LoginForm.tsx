import React  from "react";
import { toast } from "react-toastify";
import { login } from "redux/features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";


const LoginFormService = () => {
  const [data, setData] = React.useState({
    username: "",
    password: "",

  });

  const dispatch = useAppDispatch();

  const handleFormChange = (e : any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  };

  const handleLoginFormSubmit = () => {
    const dispatched = dispatch(login(data));
    ToastifyMockify(dispatched);
  }

  React.useEffect(() => {

  }, [dispatch])
 
  return {
    handleLoginFormSubmit,
    handleFormChange, 
    data
  }

};

export default LoginFormService;