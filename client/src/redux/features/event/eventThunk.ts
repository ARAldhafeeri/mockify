import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { 
  IFetchedEventData
} from "types/Event";
import { ENDPOINTS } from "constants/endpoints";
import { IAPINormalizedResponse } from "types/global";

export const fetchEvents = createAsyncThunk(
  "event/fetch",
  async (resourceName : string, thunkAPI) : Promise<IAPINormalizedResponse> => {
      const res : any = await instance.get(ENDPOINTS.EVENT_PARAM(resourceName));
      return  res.data?.data;

  }
);

export const deleteEvent = createAsyncThunk(
  "event/delete",
  async(id : string, thunkAPI): Promise<IAPINormalizedResponse> => {
    const res : any = await instance.delete(ENDPOINTS.EVENT_DELETE(id));
    return res.data;
  }
)

export const updateEvent = createAsyncThunk(
  "event/update", 
  async(data : IFetchedEventData, thunkAPI): Promise<IAPINormalizedResponse> => {
    const res : any = await instance.put(ENDPOINTS.EVENT, data);
    return res.data;
  }
)

export const createEvent = createAsyncThunk(
  "event/create",
  async(data : IFetchedEventData, _): Promise<IAPINormalizedResponse> =>{
    const res : any = await instance.post(ENDPOINTS.EVENT, data);
    return res.data;
  }
)

