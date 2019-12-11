import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getSingleProduct } from "./apiHome/apiHome";
import Card from "./card";

const Product = props => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const loadSingleProduct = productId => {
    getSingleProduct(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, []);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <h2 className="row">Single product</h2>
      <div className="row">
        {product && product.description && <Card product={product} showViewProductButton={false}/>}
      </div>
    </Layout>
  );
};

export default Product;
