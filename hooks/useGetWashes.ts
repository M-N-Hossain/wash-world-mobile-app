import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axiosInstance from "../utils/axiosInterceptor";
import { useTokenExpiration } from "./useTokenExpiration";

import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export const useGetWashes = (id: number) => {
  const token = useSelector((state: RootState) => state.user.token);
  const { handleExpiredToken } = useTokenExpiration();

  const fetchWashes = async () => {
    if (!token) throw new Error("No token provided");
    if (!id) throw new Error("No id provided");

    // Check token validity before making the request
    const isExpired = await handleExpiredToken();
    if (isExpired) throw new Error("Token expired");

    const response = await axiosInstance.get(`${API_URL}/api/washes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`Fetched washes for user ID ${id}`, response.data);

    return response.data;
  };
  
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["washes", id],
    queryFn: fetchWashes,
    retry: (failureCount, error: any) => {
      // Don't retry on token expiration
      if (error?.message === "Token expired") {
        return false;
      }
      // Retry other errors up to 3 times
      return failureCount < 3;
    },
  });

  return { isLoading, isError, data, error, refetch };
};
