import axios from "axios";
import { CreateUserDto } from "../redux/CreateUserDto";
import { LoginUserDto } from "../redux/LoginUserDto";

export class UserAPI {
  static async loginUser(userDto: LoginUserDto) {
    try {
      const response = await axios.post(
        "http://10.0.2.2:3000/auth/login",
        userDto
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }
}
// static USER_URL = "http://localhost:3000/auth";

// static async signupUser(userDto: CreateUserDto) {
//   try {
//     const response = await axios.post('http://localhost:3000/auth/signup', userDto);
//     return response.data;
//   } catch (error) {
//     console.error("Error signing up user:", error);
//     throw error;
//   }
// }
