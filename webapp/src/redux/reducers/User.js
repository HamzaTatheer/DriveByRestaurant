import {SIGN_IN,SIGN_UP,SIGN_OUT,UPDATE} from "../actions/authAction";

const authReducer = (state = null, action) => {
	console.log(action);

	switch(action.type){

		case SIGN_IN:{
			console.log("REDUCER");
			let userDetails = action.payload;
			localStorage.setItem("se_user",JSON.stringify(userDetails));
			return userDetails;
		}

		case UPDATE:{
			console.log("DONE");
			console.log({...state,...action.payload});
			return {...state, ...action.payload};
		}

		case SIGN_UP:{
			let userDetails = action.payload;
			localStorage.setItem("se_user",JSON.stringify(userDetails));
			return userDetails;
		}

		case SIGN_OUT:
			console.log("HELLO");
			localStorage.removeItem("se_user");
			return null;
		
		default:{
			return JSON.parse(localStorage.getItem("se_user"));
		}
	}
};

export default authReducer;