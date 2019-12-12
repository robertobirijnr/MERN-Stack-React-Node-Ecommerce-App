import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import Card from "../card";
import { getCart } from "./cartHelpers";


const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = items => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`}items</h2>
        <hr />
        {items.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    );
  };

  const noItemsmessage = () => (
    <h2>
      Your cart empty. <br /> <Link to="">continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage all your shopping items here. Add remove checkout or continue to shopping"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsmessage()}
        </div>
      </div>
      <div className="row">
        <p>.........</p>
      </div>
    </Layout>
  );
};

export default Cart;
