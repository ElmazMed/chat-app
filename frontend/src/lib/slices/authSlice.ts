import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  fullName: string;
  email: string;
  password: string;
}
interface AuthState {
  data: null | any;
  isLoading: boolean;
  error: string | null;
}
export const register = createAsyncThunk(
  "auth/register",
  async (user: User, thunkApi) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState: AuthState = { data: null, isLoading: false, error: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        (state.isLoading = false), (state.data = action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        (state.isLoading = false),
          (state.error = action.error.message || "An error occurred");
      });
  },
});

export default authSlice.reducer;
