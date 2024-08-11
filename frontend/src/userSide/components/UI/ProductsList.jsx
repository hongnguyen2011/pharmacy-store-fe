import React from "react";
import ProductCard from "./ProductCard";

const ProductsList = (props) => {
  const { data } = props;
  return (
    <>
      {data.map((item, index) => {
        return <ProductCard item={item} key={index}/>;
      })}
    </>
  );
};

export default ProductsList;
