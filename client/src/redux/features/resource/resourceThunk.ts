import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { 
  IFetchedResourceData
} from "types/Resource";
import { ENDPOINTS } from "constants/endpoints";

export const fetchResources = createAsyncThunk(
  "resource/fetch",
  async (projectId : string | undefined, thunkAPI) : Promise<any> => {
      try {
        const res : any = await instance.get(ENDPOINTS.RESOURCE_PROJECT_ID(projectId));
        return  res.data;
      } catch (e : any) {
        return thunkAPI.rejectWithValue(e.response.data)
      }
  }
);

export const deleteResource = createAsyncThunk(
  "resource/delete",
  async(id : string, thunkAPI): Promise<any> => {
    try {
      const res : any = await instance.delete(ENDPOINTS.RESOURCE_DELETE(id));
      return res.data;
    } catch (e : any) { 
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const updateResource = createAsyncThunk(
  "resource/update", 
  async(data : IFetchedResourceData, thunkAPI): Promise<any> => {
    try {
      const res : any =  instance.put(ENDPOINTS.RESOURCE, data);
      return res;      
    } catch (e : any){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const createResource = createAsyncThunk(
  "resource/create",
  async(data : IFetchedResourceData, thunkAPI): Promise<any> =>{
    try {
      const res : any = await instance.post(ENDPOINTS.RESOURCE, data);
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
)