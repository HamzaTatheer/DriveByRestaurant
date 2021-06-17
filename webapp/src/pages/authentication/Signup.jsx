import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MenuBar from "../../components/MenuBar";
import Button from "../../components/Button";
import {axios} from "../../axios/axios-config";
import {useHistory} from "react-router-dom";


function SignUp(props){

	let history = useHistory();
	
	let [avatar,setAvatar] = useState("");
	let [name,setName] = useState("");
	let [phone,setPhone] = useState("");
	let [password,setPassword] = useState("");

	let submitForm = ()=>{
		let formData = new FormData();
		formData.append("avatar",avatar);
		formData.append("name",name);
		formData.append("password",password);
		formData.append("phone",phone);

		axios.post("/api/customer/signup",formData,{
			headers:{
				"Content-Type":"multipart/form-data",
			}
		}).then((res)=>{
			alert("New Account Created.");
			history.push("/login");
		}).catch((err)=>{
			console.log(err);
			alert("Please Trye Again Later");
		})
	}


	return (
		<div style={{height:"100vh",width:"100vw"}}>
			<div style={{height:"auto"}}>
			<MenuBar>
				<Button menuButton label="Home"/>
			</MenuBar>
			</div>
			<div className="d-flex justify-content-center w-100" style={{marginTop:"100px"}}>
				<div style={{width:"345px"}}>
					<div style={{marginBottom:"50px"}}>
						<h4 style={{fontWeight:"bold"}} className="text-center">New Account</h4>
					</div>

					<div className="d-flex justify-content-between">
						<div>
							<AccountBoxIcon/>
						</div>
						<div >
							<input type="file" onChange={(e)=>setAvatar(e.target.files[0])} accept="image/*"/>
						</div>
					</div>

					<div style={{width:"100%"}}>
                    <TextField style={{width:"100%",marginTop:"20px"}} label="Name" onChange={(e)=>setName(e.target.value)}/>
                    <TextField style={{width:"100%",marginTop:"20px"}} label="Phone no" onChange={(e)=>setPhone(e.target.value)}/>
                    <TextField style={{width:"100%",marginTop:"20px"}} label="Password" onChange={(e)=>setPassword(e.target.value)}/>
					</div>

					<div className="text-center" style={{marginTop:"50px"}}>
						<input type="button" value="Sign Up" onClick={submitForm}/>
					</div>


				</div>

			</div>
		</div>
	);
}

export default SignUp;