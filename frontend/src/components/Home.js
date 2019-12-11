import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiHome/apiHome";
import Card from "./card";
import Search from "./search";

const Home = () => {
  const [productsBySell, setProductBySell] = useState([]);
  const [productsByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="Node React E-commerce App"
      className="container-fluid"
    >
      <Search />
      <h2>New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card  product={product} />
          </div>
        ))}
      </div>

      <h2>Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
           <div key={i} className="col-4 mb-3">
          <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
