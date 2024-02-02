import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createClient, deleteClient, fetchClients, updateClient } from "./clientThunk";
import { IFetchClientResponse, IFetchedClientData, IClientInitState } from "types/Client";

const initialState : IClientInitState = {
  client: [],
  loading: true,
  error: null
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // fetch clients
      .addCase(fetchClients.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(fetchClients.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(fetchClients.fulfilled, (
        state, action : PayloadAction<  IFetchedClientData | any>
        ) => {
        state.loading = false;
        state.client = action.payload;
      })


      // delete client
      .addCase(deleteClient.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(deleteClient.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(deleteClient.fulfilled, (
        state, action : PayloadAction< any | IFetchClientResponse>
        ) => {
        state.loading = false;
        state.client = state.client.filter((client: any) => client._id !== action.payload.data?._id);
      })

      builder
      // update clients
      .addCase(updateClient.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(updateClient.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(updateClient.fulfilled, (
        state, action : PayloadAction<  IFetchClientResponse | any>
        ) => {
        state.loading = false;
        const index = state.client.findIndex(
          (client: any) => client._id === action.payload.data?._id);
        state.client[index] = {
          ...action.payload.data
        }

      })

      // create clients
      .addCase(createClient.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(createClient.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(createClient.fulfilled, (
        state, action : PayloadAction<  IFetchClientResponse[] | any >
        ) => {
        state.loading = false;

         state.client.push(action.payload.data);
      })
  },
});

export default clientSlice.reducer;