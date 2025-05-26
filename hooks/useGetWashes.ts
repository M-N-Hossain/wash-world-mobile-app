import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useQuery } from "@tanstack/react-query";

const API_URL = `${process.env.URL}/wash`;

export const useGetWashes = (id: number) => {
  const token = useSelector((state: RootState) => state.user.token);

  const fetchWashes = async () => {
    if (!token) throw new Error("No token provided");
    if (!id) throw new Error("No id provided");

    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log(`Fetched washes for user ID ${id}`, response.data);

    return response.data;
  };
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["washes", id],
    queryFn: fetchWashes,
  });

  return { isLoading, isError, data, error };
};
