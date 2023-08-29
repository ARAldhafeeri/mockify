import { createSlice } from "@reduxjs/toolkit";
import { login, logout, setCurrentUser } from "./authThunk";

interface IAuthInitState {
  auth: string;
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
    setCurrentUser: (state, action) => {
      state.auth = action.payload;
    },
    logout: (state, _) => {
      state.auth = "";
    },
    login: (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, _) => {
        state.loading = false;
      })
  },
});

export default authSlice.reducer;