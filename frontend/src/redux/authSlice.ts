import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";
import type { AuthResponse, User } from "../types";

type AuthState = {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null
};

export const registerUser = createAsyncThunk("auth/register", async (payload: { email: string; password: string }) => {
  const { data } = await api.post<AuthResponse>("/register", payload);
  return data;
});

export const loginUser = createAsyncThunk("auth/login", async (payload: { email: string; password: string }) => {
  const { data } = await api.post<AuthResponse>("/login", payload);
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
