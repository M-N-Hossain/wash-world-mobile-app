import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateUserDto } from "./CreateUserDto";
import { UserAPI } from "../APIs/UserAPI";
import { LoginUserDto } from "./LoginUserDto";

export const signup = createAsyncThunk(
  "auth/signup",
  async (createUserDto: CreateUserDto, thunkApi) => {
    return await UserAPI.signupUser(createUserDto);
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (loginUserDto: LoginUserDto, thunkApi) => {
    return await UserAPI.loginUser(loginUserDto);
  }
);

type UserState = {
  token: string;
  errormessage: string;
};

const initialState: UserState = {
  token: "",
  errormessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.errormessage = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.token = "";
      state.errormessage = "Hey bitch, it didn't work";
    });
  },
});

export default userSlice.reducer;
