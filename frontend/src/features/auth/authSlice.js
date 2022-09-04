import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "./authService";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

// Register
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Login
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Initial State
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      // console.log(action);
      state.user = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    [register.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    },
    [logout.fulfilled]: (state) => {
      state.user = null;
    },
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    [login.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Oops! Invalid credentials.";
    },
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
