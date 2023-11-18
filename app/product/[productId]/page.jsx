import { getItembyId } from "@app/api/productapi/productapi";
import ProductDetails from "@components/ProductDetails/ProductDetails";
import getQueryClient from "@components/getQueryClient";
import ReactQueryHydrate from "@components/hydrateClient";
import { dehydrate } from "@tanstack/react-query";
async function Page({ params }) {
  const queryClient = getQueryClient();
  await queryClient.fetchQuery({
    queryKey: ["product", params.productId],
    queryFn: () => getItembyId(params.productId),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <ProductDetails id={params.productId} />
    </ReactQueryHydrate>
  );
}

export default Page;
