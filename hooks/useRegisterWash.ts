import { useMutation } from "@tanstack/react-query";
import { WashEntity } from "../entities/RegisterWash";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import Constants from "expo-constants";
import axiosInstance from "../utils/axiosInterceptor";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export const useRegisterWash = () => {
  const token = useSelector((state: RootState) => state.user.token);

  return useMutation({
    mutationFn: async (wash: WashEntity) => {
      const response = await axiosInstance.post(`${API_URL}/api/washes`, wash, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });
};
