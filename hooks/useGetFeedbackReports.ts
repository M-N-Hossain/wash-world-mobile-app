import Constants from "expo-constants";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useTokenExpiration } from "./useTokenExpiration";
import axiosInstance from "../utils/axiosInterceptor";
import { useQuery } from "@tanstack/react-query";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export const useGetFeedbackReports = (id: number) => {
  const token = useSelector((state: RootState) => state.user.token);
  const { handleExpiredToken } = useTokenExpiration();

  const fetchFeedbackReports = async () => {
    if (!token) throw new Error("No token provided");
    if (!id) throw new Error("No id provided");

    // Check token validity before making the request
    const isExpired = await handleExpiredToken();
    if (isExpired) throw new Error("Token expired");

    const response = await axiosInstance.get(`${API_URL}/api/feedback/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log(`Fetched reports for user ID ${id}`, response.data);

    return response.data;
  };

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["feedbackReports", id],
    queryFn: fetchFeedbackReports,
    retry: (failureCount, error: any) => {
      if (error?.message === "Token expired") {
        return false;
      }
      return failureCount < 3;
    },
  });
  return { isLoading, isError, data, error, refetch };
};
