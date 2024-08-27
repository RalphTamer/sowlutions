"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, ProductType } from "../utils/utils";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
export type PositionsArrType = Array<{ position: number; productId: number }>;
const AllProducts = () => {
  const [refArray, setRefArray] = useState<Array<HTMLDivElement | null> | null>(
    null
  );
  const { data: products, error } = useQuery({
    queryKey: ["getProducts"],
    queryFn: () => fetchProducts(),
  });
  if (error != null) {
    throw new Error(error.message);
  } else if (products == null) {
    throw new Error("something went wrong");
  }
  const [allProducts, setAllProducts] = useState<ProductType[]>(products);
  useEffect(() => {
    if (localStorage.getItem("cardPositions") == null) {
      const arrBuilder: PositionsArrType = [];
      products.forEach((product, i) => {
        arrBuilder.push({
          position: i,
          productId: product.id,
        });
      });
      localStorage.setItem("cardPositions", JSON.stringify(arrBuilder));
    }
  }, [products]);
  return (
    <div className="container my-4 space-y-2">
      <h1 className="font-bold ">All Products</h1>
      <div className="grid grid-cols-4 gap-4">
        {allProducts.map((product) => {
          return (
            <ProductCard
              productCardRef={(ref) => {
                // if (ref == null) {
                //   return;
                // }
                // setRefArray((prev) => {
                //   if (prev == null) {
                //     return [ref];
                //   }
                //   return [...prev, ref];
                // });
              }}
              dragEvent={(e) => {
                const jsonArr = localStorage.getItem("cardPositions");
                if (jsonArr == null) {
                  return;
                }
                const arr: PositionsArrType = JSON.parse(jsonArr);
                console.log(arr);
                // Couldve solved it with little AI help :)
                if (e.clientX > 300) {
                  // by checking if the dragged coordinates corresponds with the dragged on Card
                  // i replace their positions accordingly
                  // then i set the the newly edited array with setAllProducts(arr)
                  // and i update the localstorage
                }
              }}
              product={product}
              key={product.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
