import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  _id: string;
  fullName: string;
  profileImg?: string;
}

interface Chat {
  messages: [];
  users: User[];
  selectedUser: null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  error: string | null;
}

const initialState: Chat = {
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  error: null,
};

export const getUsers = createAsyncThunk("auth/users", async (_, thunkApi) => {
  try {
    const res = await axios.get("http://localhost:5000/api/message/users", {
      withCredentials: true,
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "An error occurred";
      return thunkApi.rejectWithValue(message);
    }
  }
});

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isUsersLoading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
        state.isUsersLoading = false;
      })
      .addCase(getUsers.pending, (state) => {
        state.isUsersLoading = true;
      });
  },
});

export default chatSlice.reducer;
