const authReducer = (state = null, action) => {
	switch(action.type){

		case "SIGN_IN":{
			let userDetails = action.payload;
			localStorage.setItem("se-user",JSON.stringify(userDetails));
			return userDetails;
		}

		case "SIGN_UP":{
			let userDetails = action.payload;
			localStorage.setItem("se-user",JSON.stringify(userDetails));
			return userDetails;
		}

		case "SIGN_OUT":
			localStorage.setItem("se-user",null);
			return null;
		
		default:{
			return JSON.parse(localStorage.getItem("se-user"));
		}
	}
};

export default authReducer;