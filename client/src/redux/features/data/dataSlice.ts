import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createData, deleteData, fetchData, updateData } from "./dataThunk";
import { IFetchDataResponse, IFetchedDataData, IDataInitState } from "types/Data";

const initialState : IDataInitState = {
  data: [],
  loading: true,
  error: null
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // fetch datas
      .addCase(fetchData.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(fetchData.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(fetchData.fulfilled, (
        state, action : PayloadAction<  IFetchDataResponse | any>
        ) => {
        state.loading = false;
        state.data = action.payload;
      })


      // delete data
      .addCase(deleteData.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(deleteData.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(deleteData.fulfilled, (
        state, action : PayloadAction< any | IFetchDataResponse>
        ) => {
        state.loading = false;
        state.data = state.data.filter((data: any) => data._id !== action.payload.data._id);
      })

      builder
      // update datas
      .addCase(updateData.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(updateData.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(updateData.fulfilled, (
        state, action : PayloadAction<  IFetchDataResponse | any>
        ) => {
        state.loading = false;
        const index = state.data.findIndex(
          (data: any) => data._id === action.payload.data._id);
        state.data[index] = {
          ...action.payload.data
        }

      })

      // create datas
      .addCase(createData.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(createData.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(createData.fulfilled, (
        state, action : PayloadAction<  IFetchDataResponse[] | any >
        ) => {
        state.loading = false;

         state.data.push(action.payload.data);
      })
  },
});

export default dataSlice.reducer;