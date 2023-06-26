import ProductDetails from "@components/ProductDetails/ProductDetails";
function Page({ params }) {
  return <ProductDetails id={params.productId} />;
}

export default Page;
