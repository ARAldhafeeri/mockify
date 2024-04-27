import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { 
  IFetchedEventData
} from "types/Event";
import { ENDPOINTS } from "constants/endpoints";

export const fetchEvents = createAsyncThunk(
  "event/fetch",
  async (resourceId : string, thunkAPI) : Promise<any> => {
    try {
      const res : any = await instance.get(ENDPOINTS.EVENT_PARAM(resourceId));
      return   res.data?.data;
    } catch (e : any) {
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "event/delete",
  async(id : string, thunkAPI): Promise<any> => {
    try {
      const res : any = await instance.delete(ENDPOINTS.EVENT_DELETE(id));
      return res.data;
    } catch (e : any){ 
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const updateEvent = createAsyncThunk(
  "event/update", 
  async(data : IFetchedEventData, thunkAPI): Promise<any> => {
    try {
      const res : any =  instance.put(ENDPOINTS.EVENT, data);
      return res;      
    } catch (e : any){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const createEvent = createAsyncThunk(
  "event/create",
  async(data : IFetchedEventData, thunkAPI): Promise<any> =>{
    try {
      const res : any = await instance.post(ENDPOINTS.EVENT, data);
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
)

