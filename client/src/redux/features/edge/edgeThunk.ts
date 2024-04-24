import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { 
  IFetchedEdgeData
} from "types/Edge";
import { ENDPOINTS } from "constants/endpoints";

export const fetchEdge = createAsyncThunk(
  "edge/fetch",
  async (name: string , thunkAPI) : Promise<any> => {
    try {
      const res : any = await instance.get(ENDPOINTS.EDGE_NAME(name));
      return  res.data;
    } catch (e : any) {
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
);

export const deleteEdge = createAsyncThunk(
  "edge/delete",
  async(data : any, thunkAPI): Promise<any> => {
    try {
      const res : any = await instance.delete(ENDPOINTS.EDGE_DELETE(data?.resourceName, data?.id));
      return res.data;
    } catch (e : any){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const updateEdge = createAsyncThunk(
  "edge/update", 
  async(data : any, thunkAPI): Promise<any> => {
    try {
      const res : any =  instance.put(ENDPOINTS.EDGE_NAME(data?.resourceName), data?.edge);
      return res;      
    } catch (e : any){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const createEdge = createAsyncThunk(
  "edge/create",
  async(data : any, thunkAPI): Promise<any> =>{
    try {
      const res : any = await instance.post(ENDPOINTS.EDGE_NAME(data?.resourceName), data?.edge);
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
)