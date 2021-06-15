import {instance} from "./axios-config";

export const addInterceptors = (instance)=>{
	instance.interceptors.request.use(addAccessToken,handleRequestError);
	instance.interceptors.response.use(handleResponseOK,handleResponseError);
};


export const addAccessToken = (config) => {
	const data = JSON.parse(localStorage.getItem("se_user"));
	let accessToken = data.accessToken;
	return { ...config, headers: { "access_token": `${accessToken}` } };
};

export const handleRequestError = (error) => {
	console.log("handleRequestError", error);
	return Promise.reject(error);
};


export const handleResponseOK = (response) => {
	console.log("handleResponseOK", response);
	return response;
};

export const handleResponseError = (error) => {
	return Promise.reject(error);
};