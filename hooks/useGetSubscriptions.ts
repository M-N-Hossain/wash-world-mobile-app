import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export type Subscription = {
  id: string;
  tierName: string;
  description: string;
  price: string;
};

export const useGetSubscriptions = () => {
  const fetchSubscriptions = async () => {
    const response = await axios.get(`${API_URL}/api/subscriptions`);
    return response.data;
  };

  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
  });
};