import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { isAuthenticated } from "../auth";
// import { Link } from 'react-router-dom';
import {getOrders } from "./apiAdmin";

const Orders = () => {
    const [orders, setOrders] = useState([])

    const {user,token} = isAuthenticated()

    const loadOrders =()=>{
        getOrders(user._id,token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setOrders(data)
            }
        })
    }

    useEffect(()=>{
        loadOrders()
    },[])

    const noOrders = orders =>{
        return orders.length < 1 ? <h4>No orders found</h4> : null
    }

    return (
        <Layout title="Orders" description={`Hey Welcome ${user.name}`}>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {noOrders(orders)}
              {JSON.stringify(orders)}
            </div>
          </div>
        </Layout>
      );
}
 
export default Orders;
