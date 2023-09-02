import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./userThunk";
import { IFetchUserResponse, IUserInitState } from "types/User";

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

      .addCase(fetchUsers.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(fetchUsers.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action : PayloadAction<IFetchUserResponse>) => {
        state.loading = false;
        state.user = action.payload;
      })
  },
});

export default userSlice.reducer;