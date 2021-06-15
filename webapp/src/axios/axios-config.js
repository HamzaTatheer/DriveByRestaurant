import axios from "axios";
import {addInterceptors,addAccessToken,handleRequestError,handleResponseOK,handleResponseError} from "./interceptors";

const baseURL="http://localhost:3004";

const unsecure_instance = axios.create({
	baseURL: baseURL,
	timeout: 60000
});


const secure_instance = axios.create({
	baseURL: baseURL,
	timeout: 60000
});

secure_instance.interceptors.request.use(addAccessToken,handleRequestError);
secure_instance.interceptors.response.use(handleResponseOK,handleResponseError);

export {unsecure_instance as axios,secure_instance as axios_authenticated};