import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import { FAILED_TO_FETCH_USERS } from "constants/messages";
import { 
  IFetchUserResponse
} from "types/User";
import { ENDPOINTS } from "constants/endpoints";


export const fetchUsers = createAsyncThunk(
  "user/fetch",
  async (_ , thunkAPI) : Promise<IFetchUserResponse> => {
      const res : any = await instance.get(ENDPOINTS.USER);
      return  res.data.data;

  }
);
