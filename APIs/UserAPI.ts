import axios from "axios";
import { CreateUserDto } from "../redux/CreateUserDto";
import { LoginUserDto } from "../redux/LoginUserDto";
import { jwtDecode } from "jwt-decode";

import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;
    type DecodedToken = {
      email: string;
      exp: number;
      iat: number;
      licensePlate: string;
      subscriptionId: string;
      id: string;
    };
export class UserAPI {
  static API_URL = API_URL

  static async loginUser(userDto: LoginUserDto) {
    try {
      const response = await axios.post(`${this.API_URL}/auth/login`, userDto);
      // console.log("Full response from backend:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }
  static async signupUser(userDto: CreateUserDto) {
    try {
      const response = await axios.post(`${this.API_URL}/auth/signup`, userDto);
      return response.data;
    } catch (error) {
      console.error("Error signing up user:", error);
      throw error;
    }
  }

  static async getUserById(token: string) {
    
    try {
      const decodedToken = jwtDecode(token) as DecodedToken;
      const response = await axios.get(`${this.API_URL}/api/users/${decodedToken.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }
}
