import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./Home";
import PrivateRoute from "../components/auth/privateRoute";
import AdminRoute from "../components/auth/adminRoute";
import Dashboard from "./user/userDashboard";
import adminDashboard from "./user/adminDashboard";
import AddCategory from "./admin/addCategory";
import AddProduct from "./admin/addProduct";
import Product from "./productPage";
import Shop from "./shop";
import Cart from "./cart/cart";
import Orders from "./admin/orders";
import Profile from "./user/profile";
import ManageProducts from "./admin/manageProducts";
import UpdateProduct from "./admin/updateProduct";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={adminDashboard} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
