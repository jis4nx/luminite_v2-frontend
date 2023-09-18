import { useQuery } from "react-query";
import { listAddress } from "@app/api/accountApi/accountApi";

export const useUserAdressQuery = () => {
  return useQuery("address", listAddress);
};
