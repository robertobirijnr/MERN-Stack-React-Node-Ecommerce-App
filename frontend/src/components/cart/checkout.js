import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Checkout</button>
    ) : (
      <Link to="/signin">
        <button className="brn btn-primary">Sign in to Checkout</button>
      </Link>
    );
  };

  return (
    <div>
      <h2>Total:${getTotal()}</h2>
      <hr />
      {showCheckout()}
    </div>
  );
};

export default Checkout;
