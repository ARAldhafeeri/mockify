import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { 
  IFetchedEndpointData
} from "types/Endpoint";
import { ENDPOINTS } from "constants/endpoints";
import { IAPINormalizedResponse } from "types/global";

export const fetchEndpoints = createAsyncThunk(
  "endpoint/fetch",
  async (_ , thunkAPI) : Promise<IAPINormalizedResponse> => {
      const res : any = await instance.get(ENDPOINTS.RESOURCE);
      console.log(res)
      return  res.data.data;

  }
);
