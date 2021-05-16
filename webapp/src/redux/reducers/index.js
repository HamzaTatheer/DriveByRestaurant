import { combineReducers } from "redux";

//Add Additional Reducers Here 
import UserReducer from "./User";
import CartReducer from "./cart";

//add here also and give the name to the reducer
const allReducers = combineReducers({
	user: UserReducer,
	cart:CartReducer
});

export default allReducers;