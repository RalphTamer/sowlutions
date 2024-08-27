import { z } from "zod";

export type ProductType = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
};

export const productschema = z.array(
  z.object({
    category: z.string(),
    description: z.string(),
    id: z.number(),
    image: z.string(),
    price: z.number(),
    rating: z.object({ rate: z.number(), count: z.number() }),
    title: z.string(),
  })
);

export const fetchProducts = async () => {
  const res = await fetch(`https://fakestoreapi.com/products`);
  const data = await res.json();
  const parsedPokemon = productschema.parse(data);
  return parsedPokemon;
};
