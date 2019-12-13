import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./showImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cart/cartHelpers";

const Card = ({
  product,
  cartUpdate = false,
  showViewProductButton = true,
  showAddToCartButton = true,
  showRemoveButton = false
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

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

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const addToCartButton = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const removeButton = showRemoveButton => {
    return (
      showRemoveButton && (
        <button
          onClick={() => removeItem(product._id)}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of stock</span>
    );
  };

  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOption = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              className="form-control"
              type="number"
              value={count}
              onChange={handleChange(product._id)}
            ></input>
          </div>
        </div>
      )
    );
  };

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">ghc{product.price}</p>
        <p className="black-9">
          Category:{product.category && product.category.name}
        </p>
        <p className="black-8">Add on {moment(product.createdAt).fromNow()}</p>
        {showStock(product.quantity)}
        <br />
        {showViewButton(showViewProductButton)}

        {addToCartButton(showAddToCartButton)}
        {removeButton(showRemoveButton)}
        {showCartUpdateOption(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
