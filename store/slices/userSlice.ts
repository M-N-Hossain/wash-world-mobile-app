import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import userService from "../../services/userService";
import { CreateUserDto, LoginUserDto, UserState } from "../../types/auth";

export const signup = createAsyncThunk(
  "auth/signup",
  async (createUserDto: CreateUserDto, thunkApi) => {
    const response = await userService.signupUser(createUserDto);
    const token = response.access_token;

    // Save the token securely immediately - store as plain string
    await SecureStore.deleteItemAsync("jwt");
    await SecureStore.setItemAsync("jwt", token);

    await thunkApi.dispatch(getUser(token));

    return { token };
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (loginUserDto: LoginUserDto, thunkApi) => {
    const response = await userService.loginUser(loginUserDto);
    const token = response.access_token;

    // Save the token securely immediately - store as plain string
    await SecureStore.deleteItemAsync("jwt");
    await SecureStore.setItemAsync("jwt", token);

    await thunkApi.dispatch(getUser(token));

    return { token };
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (token: string, thunkApi) => {
    const response = await userService.getUserById(token);
    return response
  }
);

const initialState: UserState = {
  token: "",
  errormessage: "",
  isLoadingUser: false,
  user_profile: {
    id: 0,
    firstName: "",
    lastName: "",
    licensePlate: "",
    email: "",
    subscription: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reloadJwtFromStorage: (state, action: PayloadAction<string>) => {
      state.token = action.payload;

      state.user_profile = {
        id: 0,
        firstName: "",
        lastName: "",
        licensePlate: "",
        email: "",
        subscription: "",
      };
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
        subscription: "",
      };

      // Remove token from secure storage
      SecureStore.deleteItemAsync("jwt");
    },
    updateUserProfile: (state, action) => {
      state.user_profile = {
        ...state.user_profile, 
        ...action.payload,
        subscription: action.payload.subscription.tierName
      };
    }
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
      state.isLoadingUser = false;

      state.user_profile = {
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        licensePlate: action.payload.licensePlate,
        email: action.payload.email,
        subscription: action.payload.subscription.tierName,
      };
      state.errormessage = "";
    });
    builder.addCase(getUser.pending, (state) => {
      state.isLoadingUser = true;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoadingUser = false;

      state.user_profile = {
        id: 0,
        firstName: "",
        lastName: "",
        licensePlate: "",
        email: "",
        subscription: "",
      };
      state.errormessage = "Failed to fetch user profile. Please try again.";
    });
  },
});

export const { reloadJwtFromStorage, logout, updateUserProfile } = userSlice.actions;
export default userSlice.reducer; 