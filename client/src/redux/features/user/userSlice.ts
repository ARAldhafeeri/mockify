import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUser, fetchUsers, updateUser } from "./userThunk";
import { IFetchUserResponse, IFetchedUserData, IUserInitState } from "types/User";

const initialState : IUserInitState = {
  user: [],
  loading: true,
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // fetch users
      .addCase(fetchUsers.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(fetchUsers.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(fetchUsers.fulfilled, (
        state, action : PayloadAction<  IFetchUserResponse | any>
        ) => {
        state.loading = false;
        state.user = action.payload;
      })


      // delete user
      .addCase(deleteUser.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(deleteUser.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(deleteUser.fulfilled, (
        state, action : PayloadAction< any | IFetchUserResponse>
        ) => {
        state.loading = false;
        state.user = state.user.filter((user: any) => user._id !== action.payload.data._id);
      })

      builder
      // update users
      .addCase(updateUser.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(updateUser.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(updateUser.fulfilled, (
        state, action : PayloadAction<  IFetchUserResponse | any>
        ) => {
        state.loading = false;
        const index = state.user.findIndex(
          (user: any) => user._id === action.payload.data._id);
        state.user[index] = {
          ...action.payload.data
        }

      })

      // create users
      .addCase(createUser.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(createUser.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(createUser.fulfilled, (
        state, action : PayloadAction<  IFetchUserResponse[] | any >
        ) => {
        state.loading = false;

         state.user.push(action.payload.data);
      })
  },
});

export default userSlice.reducer;