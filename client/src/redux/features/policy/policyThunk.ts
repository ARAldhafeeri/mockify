import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { 
  IFetchedPolicyData
} from "types/Policy";
import { ENDPOINTS } from "constants/endpoints";
import { IAPINormalizedResponse } from "types/global";

export const fetchPolicy = createAsyncThunk(
  "policy/fetch",
  async (projectID: string , thunkAPI) : Promise<IAPINormalizedResponse> => {
      const res : any = await instance.get(ENDPOINTS.DATA_POLICY_NAME(projectID));
      return  res.policy.policy;

  }
);

export const deletePolicy = createAsyncThunk(
  "policy/delete",
  async(id : string, thunkAPI): Promise<IAPINormalizedResponse> => {
    const res : any = await instance.delete(ENDPOINTS.POLICY_DELETE(id));
    return res.policy;
  }
)

export const updatePolicy = createAsyncThunk(
  "policy/update", 
  async(policy : IFetchedPolicyData, thunkAPI): Promise<IAPINormalizedResponse> => {
    const res : any = await instance.put(ENDPOINTS.POLICY, policy);
    return res.policy;
  }
)

export const createPolicy = createAsyncThunk(
  "policy/create",
  async(policy : IFetchedPolicyData, _): Promise<IAPINormalizedResponse> =>{
    const res : any = await instance.post(ENDPOINTS.DATA, policy);
    return res.policy;
  }
)