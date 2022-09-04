import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

// Get goals
export const getGoals = createAsyncThunk("goals/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.getGoals(token);
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

export const addGoal = createAsyncThunk("goals/add", async (goal, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.addGoal(goal, token);
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(id, token);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [addGoal.pending]: (state) => {
      state.isLoading = true;
    },
    [addGoal.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals.push(payload);
    },
    [addGoal.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    },
    [getGoals.pending]: (state) => {
      state.isLoading = true;
    },
    [getGoals.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.goals = payload;
    },
    [getGoals.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    },
    [deleteGoal.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteGoal.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.goals = state.goals.filter((goal) => goal._id !== payload._id);
    },
    [deleteGoal.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    },
  },
});

export default goalSlice.reducer;
export const { resetErrors } = goalSlice.actions;
