import { useMutation } from "@tanstack/react-query";
import { WashEntity } from "../entities/RegisterWash";
import axios from "axios";

const WASH_URL = "http://10.0.2.2:3000/wash";

export const useRegisterWash = () => {
  return useMutation({
    mutationFn: (newWash: WashEntity) => {
      return axios.post(WASH_URL, newWash);
    },
  });
};
