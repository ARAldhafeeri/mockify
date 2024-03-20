import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { 
  IFetchedClientData
} from "types/Client";
import { ENDPOINTS } from "constants/endpoints";

export const fetchClients = createAsyncThunk(
  "client/fetch",
  async (projectId : string | undefined, thunkAPI) : Promise<any> => {
      try {
        const res : any = await instance.get(ENDPOINTS.CLIENT_PARAM(projectId));
        return   res.data?.data;
      } catch (e : any) {
        return thunkAPI.rejectWithValue(e.response.data)
      }
  }
);

export const deleteClient = createAsyncThunk(
  "client/delete",
  async(id : string, thunkAPI): Promise<any> => {
    try {
      const res : any = await instance.delete(ENDPOINTS.CLIENT_DELETE(id));
      return res.data;
    } catch (e : any){ 
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const updateClient = createAsyncThunk(
  "client/update", 
  async(data : IFetchedClientData, thunkAPI): Promise<any> => {
    try {
      const res : any =  instance.put(ENDPOINTS.CLIENT, data);
      return res.data;      
    } catch (e : any){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const createClient = createAsyncThunk(
  "client/create",
  async(data : IFetchedClientData, thunkAPI): Promise<any> =>{
    try {
      const res : any = await instance.post(ENDPOINTS.CLIENT, data);
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
)