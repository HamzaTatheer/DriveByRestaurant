import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import MenuBar from "../../components/Customer/CustomerMenu";
import OrderFoodScreen from "./OrderFoodScreen";
import ProfileSettings from "./ProfileSettings";
import OrderHistory from "./OrderHistory";

export default function CustomerDashboard() {
  const { path } = useRouteMatch();

  return (
    <>
      <MenuBar />
      <Route>
        <Switch>
          <Route
            exact
            path={[`${path}/profileSettings`]}
            component={ProfileSettings}
          />
          <Route
            exact
            path={[`${path}/orderHistory`]}
            component={OrderHistory}
          />
          <Route path={[`${path}/`]} component={OrderFoodScreen} />
        </Switch>
      </Route>
    </>
  );
}
