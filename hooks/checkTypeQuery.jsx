import { useQuery } from "react-query";
import { checkType } from "@app/api/accountApi/accountApi";

export const getUserType = () => {
  return useQuery("checkType", checkType);
};
