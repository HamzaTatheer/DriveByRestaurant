import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import MenuBar from "../../components/Cashier/CashierMenu";
import { Component } from "react";
import Orders from "./Orders";
import ChatSupport from "./ChatSupport";
export default function Delivery() {
  const { path } = useRouteMatch();
  return (
    <>
      <MenuBar />
      <Route>
        <Switch>
          <Route exact path={[`${path}/orders`]} component={Orders} />
          <Route exact path={[`${path}/chatsupport`]} component={ChatSupport} />
          <Route path={[`${path}/`]} component={Orders} />
        </Switch>
      </Route>
    </>
  );
}
