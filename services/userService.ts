import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axiosInterceptor";
import { API_URL } from "../constants/api";
import { CreateUserDto, LoginUserDto } from "../types/auth";
import { DecodedToken } from "../types/api";

class UserService {
  async loginUser(userDto: LoginUserDto) {
    try {
      const response = await axiosInstance.post(
        `${API_URL}/auth/login`,
        userDto
      );
      return response.data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }

  async signupUser(userDto: CreateUserDto) {
    try {
      const response = await axiosInstance.post(
        `${API_URL}/auth/signup`,
        userDto
      );
      return response.data;
    } catch (error) {
      console.error("Error signing up user:", error);
      throw error;
    }
  }

  async getUserById(token: string) {
    try {
      const decodedToken = jwtDecode(token) as DecodedToken;
      const response = await axiosInstance.get(
        `${API_URL}/api/users/${decodedToken.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }

  async updateUserProfile(token: string, userData: any) {
    try {
      const decodedToken = jwtDecode(token) as DecodedToken;
      const response = await axiosInstance.put(
        `${API_URL}/api/users/${decodedToken.id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }
}

export default new UserService(); 