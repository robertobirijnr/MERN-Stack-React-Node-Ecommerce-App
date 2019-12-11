import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./showImage";

const Card = ({ product, showViewProductButton = true }) => {
  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mr-2 mb-2">
            view Product
          </button>
        </Link>
      )
    );
  };

  return (
    <div className="card">
      <div className="card-header">{product.name}</div>
      <div className="card-body">
        <ShowImage item={product} url="product" />
        <p>{product.description.substring(0, 100)}</p>
        <p>gh{product.price}</p>

        {showViewButton(showViewProductButton)}

        <button className="btn btn-outline-warning mt-2 mb-2">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
