import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import decode, {JwtPayload} from "jwt-decode";
import Cookies from "js-cookie";
import { createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// import { toast } from "react-toastify";

const setAuthToken = (token : string | null) => {
  if (token) {
    Cookies.set("token", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
    Cookies.remove("token");
  }
};

export const setCurrentUser = createAction(
  "SET_CURRENT_USER",
  function prepare(token) {
    const user = token ? decode<JwtPayload>(token) : null;
    setAuthToken(token);
    return {
      payload: user,
    };
  }
);

interface loginProps {
  data : {
    email : string;
    password : string;
  };
}

interface IAuth {
  token: string;
}


export const login = createAsyncThunk(
  "users/login",
  async (props : loginProps, thunkAPI) : Promise<IAuth> => {
    console.log("login", props.data);
    const response = await instance.post("/login", props.data)
    .then((response) => {
      thunkAPI.dispatch(setCurrentUser( response.data.token));
      toast.success("Login Successful");
      return  response.data.token;
    }).catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });

    return response;

  }
);


export const logout = createAction("LOGOUT", function prepare() {
  setAuthToken(null);
  return {
    payload: null,
  };
});