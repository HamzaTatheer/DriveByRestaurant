import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import React from "react";

import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/Signup";
import AdminPage from "./pages/admin/";
import CustomerPage from "./pages/customer/";
import DeliveryPage from "./pages/delivery/";





function App() {

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path={["/","/login"]} component={Login} />
          			<Route exact path="/signup" component={SignUp} />
					<ProtectedRoute privelage="admin" path="/admin" component={AdminPage}/>
					<ProtectedRoute privelage="customer" path="/customer" component={CustomerPage}/>
					<ProtectedRoute privelage="delivery" path="/delivery" component={DeliveryPage}/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
