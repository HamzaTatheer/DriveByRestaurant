import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import FoodItems from "./FoodItems";
import Employees from "./Employees";
import ProtectedRoute from "../../components/ProtectedRoute";
import MenuBar from "../../components/Admin/AdminMenu";
import { Component } from "react";
export default function Admin() {
  const { path } = useRouteMatch();
  return (
    <>
      <MenuBar />
      <Route>
        <Switch>
          <Route exact path={[`${path}/fooditems`]} component={FoodItems} />
          <Route exact path={[`${path}/employees`]} component={Employees} />
          <Route path={[`${path}/`]} component={FoodItems} />
        </Switch>
      </Route>
    </>
  );
}
