import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { 
  IFetchedCacheData
} from "types/Cache";
import { ENDPOINTS } from "constants/endpoints";

export const fetchCaches = createAsyncThunk(
  "cache/fetch",
  async (data : {projectName: string} , thunkAPI) : Promise<any> => {
    try {
      const res : any = await instance.get(ENDPOINTS.CACHE(data.projectName));
      return   res.data?.data;
    } catch (e : any) {
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
);

export const deleteCache = createAsyncThunk(
  "cache/delete",
  async(data  : {projectName: string, key : string}, thunkAPI): Promise<any> => {
    try {
      const res : any = await instance.delete(ENDPOINTS.CACHE_KEY(data.projectName, data.key));
      return res.data;
    } catch (e : any){ 
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const createCache = createAsyncThunk(
  "cache/create",
  async(data : {record : any, key : string, projectName: string}, thunkAPI): Promise<any> =>{
    try {
      const res : any = await instance.post(ENDPOINTS.CACHE_KEY(data.projectName, data.key), data?.record);
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
)