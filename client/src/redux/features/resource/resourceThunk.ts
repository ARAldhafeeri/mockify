import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { 
  IFetchedResourceData
} from "types/Resource";
import { ENDPOINTS } from "constants/endpoints";
import { IAPINormalizedResponse } from "types/global";

export const fetchResources = createAsyncThunk(
  "resource/fetch",
  async (_ , thunkAPI) : Promise<IAPINormalizedResponse> => {
      const res : any = await instance.get(ENDPOINTS.RESOURCE);
      console.log(res)
      return  res.data.data;

  }
);

export const deleteResource = createAsyncThunk(
  "resource/delete",
  async(id : string, thunkAPI): Promise<IAPINormalizedResponse> => {
    const res : any = await instance.delete(ENDPOINTS.RESOURCE_DELETE(id));
    return res.data;
  }
)

export const updateResource = createAsyncThunk(
  "resource/update", 
  async(data : IFetchedResourceData, thunkAPI): Promise<IAPINormalizedResponse> => {
    console.log('data in redux', data)
    const res : any = await instance.put(ENDPOINTS.RESOURCE, data);
    return res.data;
  }
)

export const createResource = createAsyncThunk(
  "resource/create",
  async(data : IFetchedResourceData, _): Promise<IAPINormalizedResponse> =>{
    const res : any = await instance.post(ENDPOINTS.RESOURCE, data);
    return res.data;
  }
)