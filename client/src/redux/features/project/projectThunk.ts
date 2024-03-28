import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { 
  IFetchedProjectData
} from "types/Project";
import { ENDPOINTS } from "constants/endpoints";

export const fetchProjects = createAsyncThunk(
  "project/fetch",
  async (_ , thunkAPI) : Promise<any> => {
    try {
      const res : any = await instance.get(ENDPOINTS.PROJECT);
      return  res.data?.data;
    } catch (e : any) {
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/delete",
  async(id : string, thunkAPI): Promise<any> => {
    try {
      const res : any = await instance.delete(ENDPOINTS.PROJECT_DELETE(id));
      return res.data;
    } catch (e : any) {
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const updateProject = createAsyncThunk(
  "project/update", 
  async(data : IFetchedProjectData, thunkAPI): Promise<any> => {
    try {
      const res : any =  instance.put(ENDPOINTS.PROJECT, data);
      return res;      
    } catch (e : any){
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const createProject = createAsyncThunk(
  "project/create",
  async(data : IFetchedProjectData, thunkAPI): Promise<any> =>{
    try {
      const res : any = await instance.post(ENDPOINTS.PROJECT, data);
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
)