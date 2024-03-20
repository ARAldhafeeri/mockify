import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { ENDPOINTS } from "constants/endpoints";
import { IFetchResourceResponse, IFetchedResourceData } from "types/Resource";

export const fetchEndpoints = createAsyncThunk(
  "endpoint/fetch",
  async (resource : IFetchedResourceData , thunkAPI) : Promise<any> => {
    try {
      const res : any = await instance.get(ENDPOINTS.ENDPOINT);
      return  res.data;
    } catch (e : any) {
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
);
