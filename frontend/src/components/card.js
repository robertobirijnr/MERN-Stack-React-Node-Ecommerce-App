import React,{useState} from "react";
import { Link ,Redirect} from "react-router-dom";
import ShowImage from "./showImage";
import moment from "moment";
import {addItem} from './cart/cartHelpers';

const Card = ({ product, showViewProductButton = true ,showAddToCartButton=true}) => {
  const [redirect,setRedirect] = useState(false)

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

  const addToCart = () =>{
    addItem(product,()=>{
       setRedirect(true)
    })
  }

  const shouldRedirect = () =>{
    if(redirect){
      return <Redirect to ="/cart"/>
    }
      
    
  }

  const addToCartButton = (showAddToCartButton) => {
    return (showAddToCartButton &&(
      <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">Add to Cart</button>
    ));
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of stock</span>
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
      </div>
    </div>
  );
};

export default Card;
