export const signIn = (email,password) => {
	
	return (dispatch)=>{
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{

				dispatch(
					{
						type: "SIGN_IN",
						payload: {
							name:"hamza",
							role:"customer",
							accessToken:"123123123",
							refreshToken:"12321",
						}
					}
				);
				resolve();
			},2000)
		})
	}
	
};

export const signUp = (firstName,lastName,email,password) => {
	
	return (dispatch)=>{
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{

				dispatch(
					{
						type: "SIGN_UP",
						payload: {
							name:"hamza",
							role:"customer",
							accessToken:"123123123",
							refreshToken:"12321",
						}
					}
				);
				resolve();
			},2000)
		})
	}
	
};




export const signOut = () => {
	return{
		type: "SIGN_OUT"
	};
};
