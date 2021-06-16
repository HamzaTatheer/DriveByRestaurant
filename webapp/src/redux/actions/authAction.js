export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";
export const SIGN_OUT = "SIGN_OUT";
export const UPDATE = "UPDATE";

export const signIn = (id,pfp,name,phone,role,token) => {
	return (
			{
				type: SIGN_IN,
				payload: {
					id,
					pfp,
					name,
					phone,
					role,
					token
				}
			}
		);

};

export const updateUserDetails = (obj)=>{
	return {type: UPDATE,payload:obj};
}

export const signUp = (firstName,lastName,phone,password) => {
					
	return (
					{
						type: SIGN_UP,
						payload: {
							name:"hamza",
							role:"customer",
							accessToken:"123123123",
							refreshToken:"12321",
						}
					}
	);
};




export const signOut = () => {
	return{
		type: SIGN_OUT,
	};
};
