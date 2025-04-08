import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  fullName?: string;
  email?: string;
  password?: string;
  profileImg?: string;
}
interface AuthState {
  data: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
const initialState: AuthState = {
  data: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};
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
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "An error occurred";
        toast.error(message);
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: User, thunkApi) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "An error occurred";
        toast.error(message);
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      { withCredentials: true }
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "An error occurred";
      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
});

export const checkUser = createAsyncThunk(
  "auth/check-user",
  async (_, thunkApi) => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/check-user", {
        withCredentials: true,
      });

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "An error occurred";
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);

export const updateImg = createAsyncThunk(
  "auth/update-img",
  async (user: User, thunkApi) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/update-image",
        user,
        { withCredentials: true }
      );
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "An error occurred";
        toast.error(message);
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.data = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An error occurred";
        state.isAuthenticated = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An error occurred";
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.data = null;
        state.isAuthenticated = false;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(checkUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(updateImg.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
        state.isLoading = false;
      })
      .addCase(updateImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
