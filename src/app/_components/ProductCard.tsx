"use client";
import Image from "next/image";
import type { ProductType } from "../utils/utils";
import Modal from "./Modal";
import { DragEvent, MutableRefObject, useRef, useState } from "react";
import { PositionsArrType } from "./AllProducts";
type Props = {
  product: ProductType;
  dragEvent: (e: DragEvent<HTMLDivElement>) => void;
  productCardRef: (ref: MutableRefObject<HTMLDivElement | null>) => void;
};
const ProductCard = (props: Props) => {
  const { product } = props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const productCardRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <div
        ref={(ref) => {
          if (ref == null) return;
          productCardRef.current = ref;
          props.productCardRef(productCardRef);
        }}
        onClick={() => {
          setModalOpen(true);
        }}
        onDragEnd={(e) => {
          props.dragEvent(e);
        }}
        className="col-span-1 p-4 relative cursor-pointer"
        style={{
          boxShadow: "1px 1px 4px #ccc",
          borderRadius: 12,
        }}
      >
        <div className="pb-4">
          <Image
            src={product.image}
            alt="image"
            width={0}
            height={0}
            sizes="100vw"
            priority
            style={{
              width: "100%",
              height: "100%",
              aspectRatio: 3 / 4,
            }}
          />
        </div>
        <h5 className="font-bold mb-4">{product.title}</h5>
        {/* <div>{product.description}</div> */}
        <div
          className="absolute bottom-[5px] left-1/2"
          style={{
            transform: "translate(-50%,0)",
          }}
        >
          {product.price}$
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <div className="flex gap-12 container">
          <div className="w-[40%]">
            <Image
              src={product.image}
              alt="image"
              width={0}
              height={0}
              sizes="100vw"
              priority
              style={{
                aspectRatio: 1,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div className="w-[60%]">
            <h2
              style={{
                lineHeight: 1,
              }}
            >
              {product.title}
            </h2>
            <div>{product.category}</div>
            <div
              className="font-bold"
              style={{
                color: "rgb(231 15 15)",
              }}
            >
              {product.price}$
            </div>
            <p className="my-2">{product.description}</p>
            <div className="flex gap-2">
              <div
                className="font-bold"
                style={{
                  color: "#e4cf1b",
                }}
              >
                {product.rating.rate}/5
              </div>
              <div className="font-bold">({product.rating.count})</div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;
