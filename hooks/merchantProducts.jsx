import { useQuery } from "@tanstack/react-query";
import { getMerchantProducts } from "@app/api/productapi/merchant";

export const getMerchantProductList = (name) => {
  return useQuery({
    queryKey: ["merchantProductList", name],
    queryFn: () => getMerchantProducts(name),
  });
};
