import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import allReducer from "./redux/reducers";
import thunk from "redux-thunk";


const store = createStore(
	allReducer,applyMiddleware(thunk));

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);


//to be added at end as non functional requirement
//reportWebVitals();