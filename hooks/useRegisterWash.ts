import { useMutation } from "@tanstack/react-query";
import { WashEntity } from "../entities/RegisterWash";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";

const WASH_URL = "http://10.0.2.2:3000/wash";

export const useRegisterWash = () => {
  const token = useSelector((state: RootState) => state.user.token);

  return useMutation({
    mutationFn: async (wash: WashEntity) => {
      const response = await axios.post(WASH_URL, wash, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });
};
