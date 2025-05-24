import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateUserDto } from "./CreateUserDto";
import { UserAPI } from "../APIs/UserAPI";
import { LoginUserDto } from "./LoginUserDto";
import * as SecureStore from "expo-secure-store";

export const signup = createAsyncThunk(
  "auth/signup",
  async (createUserDto: CreateUserDto, thunkApi) => {
    const response = await UserAPI.signupUser(createUserDto);
    const token = response.access_token;

    // Save the token securely immediately
    await SecureStore.setItemAsync("jwt", JSON.stringify(token));

    return { token };
  }
);

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

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (token: string, thunkApi) => {
    const response = await UserAPI.getUserById(token);
    return {
      id: response.id,
      firstName: response.firstName,
      lastName: response.lastName,
      licensePlate: response.licensePlate,
      email: response.email,
      membership: response.membership,
    };
  }
);

type UserState = {
  token: string;
  errormessage: string;
  user_profile: {
    id: number;
    firstName: string;
    lastName: string;
    licensePlate: string;
    email: string;
    membership: string;
  };
};

const initialState: UserState = {
  token: "",
  errormessage: "",
  user_profile: {
    id: 0,
    firstName: "",
    lastName: "",
    licensePlate: "",
    email: "",
    membership: "",
  },
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
      state.user_profile = {
        id: 0,
        firstName: "",
        lastName: "",
        licensePlate: "",
        email: "",
        membership: "",
      };

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
    builder.addCase(signup.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.errormessage = "";
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.token = "";
      state.errormessage = "Signup failed. Please try again.";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user_profile = {
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        licensePlate: action.payload.licensePlate,
        email: action.payload.email,
        membership: action.payload.membership,
      };
      state.errormessage = "";
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.user_profile = {
        id: 0,
        firstName: "",
        lastName: "",
        licensePlate: "",
        email: "",
        membership: "",
      };
      state.errormessage = "Failed to fetch user profile. Please try again.";
    });
  },
});

export const { reloadJwtFromStorage, logout } = userSlice.actions;
export default userSlice.reducer;
