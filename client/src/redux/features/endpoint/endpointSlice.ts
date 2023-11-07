import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  fetchEndpoints } from "./endpointThunk";
import { IFetchEndpointResponse, IFetchedEndpointData, IEndpointInitState } from "types/Endpoint";

const initialState : IEndpointInitState = {
  endpoint: [],
  loading: true,
  error: null
};

const endpointSlice = createSlice({
  name: "endpoint",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // fetch endpoints
      .addCase(fetchEndpoints.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(fetchEndpoints.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(fetchEndpoints.fulfilled, (
        state, action : PayloadAction<  IFetchEndpointResponse | any>
        ) => {
        state.loading = false;
        state.endpoint = action.payload;
      })
  },
});

export default endpointSlice.reducer;