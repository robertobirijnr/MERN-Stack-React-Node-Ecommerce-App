import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./Home";
import PrivateRoute from "../components/auth/privateRoute";
import AdminRoute from "../components/auth/adminRoute";
import Dashboard from "./user/userDashboard";
import adminDashboard from "./user/adminDashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={adminDashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
