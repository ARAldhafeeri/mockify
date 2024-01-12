import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { ENDPOINTS } from "constants/endpoints";
import { IAPINormalizedResponse } from "types/global";
import { IFetchResourceResponse, IFetchedResourceData } from "types/Resource";

export const fetchEndpoints = createAsyncThunk(
  "endpoint/fetch",
  async (resource : IFetchedResourceData , thunkAPI) : Promise<IAPINormalizedResponse> => {
      const res : any = await instance.post(ENDPOINTS.ENDPOINT, resource);
      return  res.data?.data;

  }
);
