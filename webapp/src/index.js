import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { orange,green ,grey} from '@material-ui/core/colors';

import App from "./App";
import "./index.css";
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import allReducer from "./redux/reducers";
import thunk from "redux-thunk";


const store = createStore(
	allReducer,applyMiddleware(thunk));


	
const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#757ce8',
			main: '#FF007F',
			dark: '#72e0a5',
			contrastText: '#fff',
		  },
		  secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		  },
	},
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);


//to be added at end as non functional requirement
//reportWebVitals();