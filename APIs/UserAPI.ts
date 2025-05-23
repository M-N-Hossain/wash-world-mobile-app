import axios from "axios";
import { CreateUserDto } from "../redux/CreateUserDto";
import { LoginUserDto } from "../redux/LoginUserDto";

export class UserAPI {
  static USER_URL = "http://10.0.2.2:3000/auth";

  static async loginUser(userDto: LoginUserDto) {
    try {
      const response = await axios.post(`${this.USER_URL}/login`, userDto);
      return response.data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }
  static async signupUser(userDto: CreateUserDto) {
    try {
      const response = await axios.post(`${this.USER_URL}/signup`, userDto);
      return response.data;
    } catch (error) {
      console.error("Error signing up user:", error);
      throw error;
    }
  }
}
