import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createPolicy, deletePolicy, fetchPolicy, updatePolicy } from "./policyThunk";
import { IFetchPolicyResponse, IFetchedPolicyData, IPolicyInitState } from "types/Policy";

const initialState : IPolicyInitState = {
  policy: [],
  loading: true,
  error: null
};

const policySlice = createSlice({
  name: "policy",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // fetch policys
      .addCase(fetchPolicy.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(fetchPolicy.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(fetchPolicy.fulfilled, (
        state, action : PayloadAction<  IFetchPolicyResponse | any>
        ) => {
        state.loading = false;
        state.policy = action.payload.data;
      })


      // delete policy
      .addCase(deletePolicy.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(deletePolicy.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(deletePolicy.fulfilled, (
        state, action : PayloadAction< any | IFetchPolicyResponse>
        ) => {
        state.loading = false;
        state.policy = state.policy.filter((policy: any) => policy._id !== action.payload.data._id);
      })

      builder
      // update policys
      .addCase(updatePolicy.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(updatePolicy.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(updatePolicy.fulfilled, (
        state, action : PayloadAction<  IFetchPolicyResponse | any>
        ) => {
        state.loading = false;
        const index = state.policy.findIndex(
          (policy: any) => policy._id === action.payload.data._id);
        state.policy[index] = {
          ...action.payload.data
        }

      })

      // create policys
      .addCase(createPolicy.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(createPolicy.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(createPolicy.fulfilled, (
        state, action : PayloadAction<  IFetchPolicyResponse[] | any >
        ) => {
        state.loading = false;

         state.policy.push(action.payload.data);
      })
  },
});

export default policySlice.reducer;