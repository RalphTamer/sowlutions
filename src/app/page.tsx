import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { fetchProducts } from "./utils/utils";
import AllProducts from "./_components/AllProducts";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getProducts"],
    queryFn: () => fetchProducts(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllProducts />
    </HydrationBoundary>
  );
}
