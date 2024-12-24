import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URI;

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  error: null as string | null,
  userEmail: " " as string,
  
};

export const loginUser = createAsyncThunk<
  string,
  { username: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
      username,
      password,
    });
    const { user } = response.data;
    return user.email;
  } catch (error) {
    return rejectWithValue("Invalid credentials");
  }
});
export const verfiyUser = createAsyncThunk(
  "auth/verify",
  async (
    { email, code }: { email: string; code: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/verify`, {
        email,
        code,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      return rejectWithValue("Invalid code");
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      username,
      password,
      email,
    }: { username: string; password: string; email: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        username,
        password,
        email,
        role: "user",
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Registration failed:", error.response.data);
        return rejectWithValue(
          error.response.data.message || "Registration failed"
        );
      } else {
        console.error("Network error or unexpected error", error);
        return rejectWithValue("Registration failed");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userEmail = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state: any, action) => {
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(registerUser.rejected, (state: any, action) => {
        state.error = action.payload;
      })
      .addCase(verfiyUser.fulfilled, (state: any, action: any) => {
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(verfiyUser.rejected, (state: any, action: any) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
