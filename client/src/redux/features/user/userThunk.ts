import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { FAILED_TO_FETCH_USERS } from "constants/messages";
import { 
  IFetchedUserData
} from "types/User";
import { ENDPOINTS } from "constants/endpoints";
import { IAPINormalizedResponse } from "types/global";

export const fetchUsers = createAsyncThunk(
  "user/fetch",
  async (_ , thunkAPI) : Promise<IAPINormalizedResponse> => {
      const res : any = await instance.get(ENDPOINTS.USER);
      return  res.data.data;

  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async(id : string, thunkAPI): Promise<IAPINormalizedResponse> => {
    const res : any = await instance.delete(ENDPOINTS.USER_DELETE(id));
    return res.data;
  }
)

export const updateUser = createAsyncThunk(
  "user/update", 
  async(data : IFetchedUserData, thunkAPI): Promise<IAPINormalizedResponse> => {
    const res : any = await instance.put(ENDPOINTS.USER, data);
    return res.data;
  }
)

export const createUser = createAsyncThunk(
  "user/create",
  async(data : IFetchedUserData, _): Promise<IAPINormalizedResponse> =>{
    const res : any = await instance.post(ENDPOINTS.USER, data);
    return res.data;
  }
)