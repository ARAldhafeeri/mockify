import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import decode, {JwtPayload} from "jwt-decode";
import Cookies from "js-cookie";
import { createAction } from "@reduxjs/toolkit";
import { INCORRECT_LOGIN_MESSAGE } from "constants/messages";

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

interface LoginData {
    username : string;
    password : string;
}

interface IAuth {
  token?: string;
  message?: string;
  status?: boolean;
}



export const login = createAsyncThunk(
  "users/login",
  async (data : LoginData, thunkAPI) : Promise<IAuth> => {
    console.log(data)
    try {
      const res : any = await instance.post("/login", data);

      thunkAPI.dispatch(setCurrentUser( res.data.token));

      return  res.data;
    } catch (error){
      return {
        status: false,
        message: INCORRECT_LOGIN_MESSAGE
      }
    }

  }
);


export const logout = createAction("LOGOUT", function prepare() {
  setAuthToken(null);
  return {
    payload: null,
  };
});