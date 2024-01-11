import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createResource, deleteResource, fetchResources, updateResource } from "./resourceThunk";
import { IFetchResourceResponse, IFetchedResourceData, IResourceInitState } from "types/Resource";

const initialState : IResourceInitState = {
  resource: [],
  loading: true,
  error: null
};

const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // fetch resources
      .addCase(fetchResources.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(fetchResources.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(fetchResources.fulfilled, (
        state, action : PayloadAction<  IFetchedResourceData | any>
        ) => {
        state.loading = false;
        state.resource = action.payload;
      })


      // delete resource
      .addCase(deleteResource.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(deleteResource.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(deleteResource.fulfilled, (
        state, action : PayloadAction< any | IFetchResourceResponse>
        ) => {
        state.loading = false;
        state.resource = state.resource.filter((resource: any) => resource._id !== action.payload.data?._id);
      })

      builder
      // update resources
      .addCase(updateResource.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(updateResource.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(updateResource.fulfilled, (
        state, action : PayloadAction<  IFetchResourceResponse | any>
        ) => {
        state.loading = false;
        const index = state.resource.findIndex(
          (resource: any) => resource._id === action.payload.data?._id);
        state.resource[index] = {
          ...action.payload.data
        }

      })

      // create resources
      .addCase(createResource.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(createResource.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(createResource.fulfilled, (
        state, action : PayloadAction<  IFetchResourceResponse[] | any >
        ) => {
        state.loading = false;

         state.resource.push(action.payload.data);
      })
  },
});

export default resourceSlice.reducer;