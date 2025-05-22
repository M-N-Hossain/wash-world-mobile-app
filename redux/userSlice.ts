import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateUserDto } from "./CreateUserDto";
import { UserAPI } from "../APIs/UserAPI";
import { LoginUserDto } from "./LoginUserDto";
import * as SecureStore from "expo-secure-store";

// export const signup = createAsyncThunk(
//   "auth/signup",
//   async (createUserDto: CreateUserDto, thunkApi) => {
//     return await UserAPI.signupUser(createUserDto);
//   }
// );

export const login = createAsyncThunk(
  "auth/login",
  async (loginUserDto: LoginUserDto, thunkApi) => {
    const response = await UserAPI.loginUser(loginUserDto);
    const token = response.access_token;

    // Save the token securely immediately
    await SecureStore.setItemAsync("jwt", JSON.stringify(token));

    return { token };
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
  reducers: {
    reloadJwtFromStorage: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = "";
      state.errormessage = "";

      // Remove token from secure storage
      SecureStore.deleteItemAsync("jwt");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.errormessage = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.token = "";
      state.errormessage = "Login failed. Please try again.";
    });
  },
});

export const { reloadJwtFromStorage, logout } = userSlice.actions;
export default userSlice.reducer;
