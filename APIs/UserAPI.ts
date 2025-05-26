import axios from "axios";
import { CreateUserDto } from "../redux/CreateUserDto";
import { LoginUserDto } from "../redux/LoginUserDto";

export class UserAPI {
    static API_URL = `${process.env.URL}`;

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
      const response = await axios.get(`${this.API_URL}/users/me`, {
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
