import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createCache, deleteCache, fetchCaches } from "./cacheThunk";
import { IFetchCacheResponse, IFetchedCacheData, ICacheInitState } from "types/Cache";

const initialState : ICacheInitState = {
  cache: [],
  loading: true,
  error: null
};

const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // fetch caches
      .addCase(fetchCaches.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(fetchCaches.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(fetchCaches.fulfilled, (
        state, action : PayloadAction<  IFetchedCacheData | any>
        ) => {
        state.loading = false;
        state.cache = action.payload;
      })


      // delete cache
      .addCase(deleteCache.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(deleteCache.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(deleteCache.fulfilled, (
        state, action : PayloadAction< any | IFetchCacheResponse>
        ) => {
        state.loading = false;
        state.cache = state.cache.filter((cache: any) => cache.key !== action.payload.data);
      })

      // create caches
      .addCase(createCache.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(createCache.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(createCache.fulfilled, (
        state, action : PayloadAction<  IFetchCacheResponse[] | any >
        ) => {
        state.loading = false;

         state.cache.push(action.payload.data);
      })
  },
});

export default cacheSlice.reducer;