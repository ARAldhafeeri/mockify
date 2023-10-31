import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { 
  IFetchedProjectData
} from "types/Project";
import { ENDPOINTS } from "constants/endpoints";
import { IAPINormalizedResponse } from "types/global";

export const fetchProjects = createAsyncThunk(
  "project/fetch",
  async (_ , thunkAPI) : Promise<IAPINormalizedResponse> => {
      const res : any = await instance.get(ENDPOINTS.PROJECT);
      return  res.data.data;

  }
);

export const deleteProject = createAsyncThunk(
  "project/delete",
  async(id : string, thunkAPI): Promise<IAPINormalizedResponse> => {
    const res : any = await instance.delete(ENDPOINTS.PROJECT_DELETE(id));
    return res.data;
  }
)

export const updateProject = createAsyncThunk(
  "project/update", 
  async(data : IFetchedProjectData, thunkAPI): Promise<IAPINormalizedResponse> => {
    console.log('data in redux', data)
    const res : any = await instance.put(ENDPOINTS.PROJECT, data);
    return res.data;
  }
)

export const createProject = createAsyncThunk(
  "project/create",
  async(data : IFetchedProjectData, _): Promise<IAPINormalizedResponse> =>{
    const res : any = await instance.post(ENDPOINTS.PROJECT, data);
    return res.data;
  }
)