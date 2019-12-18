import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { isAuthenticated } from "../auth";
// import { Link } from 'react-router-dom';
import { getOrders } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    getOrders(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const showOrders = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">Total orders:{orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger">No orders</h1>;
    }
  };

  return (
    <Layout title="Orders" description={`Hey Welcome ${user.name}`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrders(orders)}
          {orders.map((o, oIndex) => {
            return (
              <div
                className="mt-5"
                key={oIndex}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">Order ID:{o._id}</span>
                </h2>
                <ul className="list-group mb-2">
                  <li className="list-group-item">{o.status}</li>
                  <li className="list-group-item">
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: Ghc{o.amount}</li>
                  <li className="list-group-item">Ordered By: {o.user.name}</li>
                  <li className="list-group-item">
                    Ordered On: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery address:{o.address}
                  </li>
                </ul>
                <h3 className="mt-4 mb-4 font-italic">
                  Total products in the order: {o.products.length}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
