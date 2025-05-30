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

const fetchSubscriptions = async (): Promise<Subscription[]> => {
  const response = await axios.get(`${API_URL}/api/subscriptions`);
  return response.data;
};

export const useGetSubscriptions = () => {

  return useQuery({
    queryKey: ["subscription"],
    queryFn: () => fetchSubscriptions(),
  });
};