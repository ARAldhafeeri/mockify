import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { FAILED_TO_FETCH_USERS } from "constants/messages";
import { 
  IFetchedUserData
} from "types/User";
import { ENDPOINTS } from "constants/endpoints";
import { IAPINormalizedResponse } from "types/global";

interface IRejectWIthValue {
  message: string;
  status: number;
}

export const fetchUsers = createAsyncThunk(
  "user/fetch",
  async (_ , thunkAPI) : Promise<any> => {
    try {
      const res : any = await instance.get(ENDPOINTS.USER);
      return  res.data?.data;
    } catch (e : any) {
      return thunkAPI.rejectWithValue(e.response.data)
    }

  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async(id : string, thunkAPI): Promise<any> => {
    try {
      const res : any = await instance.delete(ENDPOINTS.USER_DELETE(id));
      return res.data;
    } catch (e : any) {
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const updateUser = createAsyncThunk(
  "user/update", 
  async(data : IFetchedUserData, thunkAPI): Promise<any> => {
    try {
      const res : any =  instance.put(ENDPOINTS.USER, data);
      return res;
    } catch (e : any){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)


export const createUser = createAsyncThunk(
  "user/create",
  async(data : IFetchedUserData, thunkAPI): Promise<any> =>{
   try {
    const res : any = await instance.post(ENDPOINTS.USER, data);
    return res.data;
   } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
   }
  }
)