import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createEdge, deleteEdge, fetchEdge, updateEdge } from "./edgeThunk";
import { IFetchEdgeResponse, IFetchedEdgeData, IEdgeInitState } from "types/Edge";

const initialState : IEdgeInitState = {
  edge: [],
  loading: true,
  error: null
};

const edgeSlice = createSlice({
  name: "edge",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // fetch edges
      .addCase(fetchEdge.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(fetchEdge.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(fetchEdge.fulfilled, (
        state, action : PayloadAction<  IFetchEdgeResponse | any>
        ) => {
        state.loading = false;
        state.edge = action.payload.data;
      })


      // delete edge
      .addCase(deleteEdge.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(deleteEdge.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(deleteEdge.fulfilled, (
        state, action : PayloadAction< any | IFetchEdgeResponse>
        ) => {
        state.loading = false;
        state.edge = state.edge.filter((edge: any) => edge._id !== action.payload.data?._id);
      })

      builder
      // update edges
      .addCase(updateEdge.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(updateEdge.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(updateEdge.fulfilled, (
        state, action : PayloadAction<  IFetchEdgeResponse | any>
        ) => {
        state.loading = false;
        const index = state.edge.findIndex(
          (edge: any) => edge._id === action.payload.data?._id);
        state.edge[index] = {
          ...action.payload.data
        }

      })

      // create edges
      .addCase(createEdge.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(createEdge.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(createEdge.fulfilled, (
        state, action : PayloadAction<  IFetchEdgeResponse[] | any >
        ) => {
        state.loading = false;

         state.edge.push(action.payload.data);
      })
  },
});

export default edgeSlice.reducer;