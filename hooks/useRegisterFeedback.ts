import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useMutation } from "@tanstack/react-query";
import { Feedback } from "../entities/RegisterFeedback";
import axiosInstance from "../utils/axiosInterceptor";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export const useRegisterFeedback = () => {
  const token = useSelector((state: RootState) => state.user.token);

  return useMutation({
    mutationFn: async (feedback: Feedback) => {
      const response = await axiosInstance.post(
        `${API_URL}/api/feedback`,
        feedback,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });
};
