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
  reducers: {
    reloadJwtFromStorage: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.errormessage = "";

      // Save token to secure storage
      SecureStore.setItemAsync("jwt", JSON.stringify(action.payload.token));
    });
    builder.addCase(login.rejected, (state, action) => {
      state.token = "";
      state.errormessage = "Hey bitch, it didn't work";
    });
  },
});

export const { reloadJwtFromStorage } = userSlice.actions;
export default userSlice.reducer;
