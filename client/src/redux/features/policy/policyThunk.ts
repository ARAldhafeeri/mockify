import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { 
  IFetchedPolicyData
} from "types/Policy";
import { ENDPOINTS } from "constants/endpoints";

export const fetchPolicy = createAsyncThunk(
  "policy/fetch",
  async (projectID: string , thunkAPI) : Promise<any> => {
    try {
      const res : any = await instance.get(ENDPOINTS.DATA_POLICY_NAME(projectID));
      return  res.data;
    } catch (e : any) {
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
);

export const deletePolicy = createAsyncThunk(
  "policy/delete",
  async(id : string, thunkAPI): Promise<any> => {
    try {
      const res : any = await instance.delete(ENDPOINTS.POLICY_DELETE(id));
      return res.data;
    } catch (e : any){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const updatePolicy = createAsyncThunk(
  "policy/update", 
  async(policy : IFetchedPolicyData, thunkAPI): Promise<any> => {
    try {
      const res : any =  instance.put(ENDPOINTS.POLICY, policy);
      return res;      
    } catch (e : any){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const createPolicy = createAsyncThunk(
  "policy/create",
  async(policy : IFetchedPolicyData, thunkAPI): Promise<any> =>{
    try {
      const res : any = await instance.post(ENDPOINTS.POLICY, policy);
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
)