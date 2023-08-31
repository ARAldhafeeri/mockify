import { createSlice } from "@reduxjs/toolkit";
import { login, logout, setCurrentUser } from "./authThunk";
import { JwtPayload } from "jwt-decode";

interface IAuthInitState {
  auth: string | JwtPayload | null ;
  loading: 'loading' | 'pending' | 'rejected' | true | false;
  error: string | null;
};

const initialState : IAuthInitState = {
  auth: "",
  loading: true,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(setCurrentUser, (state, action)  => {
        state.loading = false;
        state.auth = action.payload;
      })
      .addCase(logout, (state, _) => {
        state.loading = false;
        state.auth = null;
      })
  },
});

export default authSlice.reducer;