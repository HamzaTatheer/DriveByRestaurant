import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MenuBar from "../../components/MenuBar";
import Button from "../../components/Button";



function SignUp(props){
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
							<a href="/">Add Profile Picture</a>
						</div>
					</div>

					<div style={{width:"100%"}}>
                    <TextField style={{width:"100%",marginTop:"20px"}} label="Name"/>
                    <TextField style={{width:"100%",marginTop:"20px"}} label="Phone no"/>
                    <TextField style={{width:"100%",marginTop:"20px"}} label="Password"/>
					</div>

					<div className="text-center" style={{marginTop:"50px"}}>
						<input type="button" value="Sign Up"/>
					</div>


				</div>

			</div>
		</div>
	);
}

export default SignUp;