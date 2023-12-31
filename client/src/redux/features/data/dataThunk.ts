import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { 
  IFetchedDataData
} from "types/Data";
import { ENDPOINTS } from "constants/endpoints";
import { IAPINormalizedResponse } from "types/global";

export const fetchData = createAsyncThunk(
  "data/fetch",
  async (resourceName: string , thunkAPI) : Promise<IAPINormalizedResponse> => {
      const res : any = await instance.get(ENDPOINTS.DATA_RESOURCE_NAME(resourceName));
      return  res.data.data;

  }
);

export const deleteData = createAsyncThunk(
  "data/delete",
  async(id : string, thunkAPI): Promise<IAPINormalizedResponse> => {
    const res : any = await instance.delete(ENDPOINTS.DATA_DELETE(id));
    return res.data;
  }
)

export const updateData = createAsyncThunk(
  "data/update", 
  async(data : IFetchedDataData, thunkAPI): Promise<IAPINormalizedResponse> => {
    const res : any = await instance.put(ENDPOINTS.DATA, data);
    return res.data;
  }
)

export const createData = createAsyncThunk(
  "data/create",
  async(data : IFetchedDataData, _): Promise<IAPINormalizedResponse> =>{
    const res : any = await instance.post(ENDPOINTS.DATA, data);
    return res.data;
  }
)