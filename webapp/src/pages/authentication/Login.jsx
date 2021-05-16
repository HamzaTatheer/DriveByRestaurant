import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MenuBar from "../../components/MenuBar";
import Button from "../../components/Button";
import {useDispatch} from "react-redux";
import {signIn} from "../../redux/actions/authAction";
import {useHistory} from "react-router-dom";

function Login(props){
	let history = useHistory();
	let dispatch = useDispatch();

	let [phone,setPhone] = useState('');
	let [password,setPassword] = useState('');

	let submitForm = ()=>{



		let pfp="abcdffsafasdf";
		let name = "hamza";
		let role= "customer";
		let token = "123456";
		dispatch(signIn(pfp,name,phone,role,token));

		if(role=='customer'){
			history.push("/customer");
		}

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
					<div>
						<div>
							<h4 style={{fontWeight:"bold",display:"inline"}} className="text-center">Login</h4>
							<small>
								
								<p style={{display:"inline",paddingLeft:"10px"}}>Dont have a account ? </p>
								<small>
									<a href="/" style={{display:"inline"}}>Create New</a>
								</small>
							</small>
						</div>
					</div>

					<div style={{width:"100%"}}>
						<TextField onChange={(e)=>setPhone(e.target.value)} style={{width:"100%",marginTop:"20px"}} label="Phone no"/>
						<TextField onChange={(e)=>setPassword(e.target.value)} style={{width:"100%",marginTop:"20px"}} label="Password"/>
					</div>

					<div className="text-center" style={{marginTop:"50px"}}>
						<input onClick={()=>submitForm()} type="button" value="Login"/>
					</div>
					</div>

			</div>
		</div>
	);
}

export default Login;