import { combineReducers } from "redux";

//Add Additional Reducers Here 
import UserReducer from "./User";

//add here also and give the name to the reducer
const allReducers = combineReducers({
	user: UserReducer
});

export default allReducers;