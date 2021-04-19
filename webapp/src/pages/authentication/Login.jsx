import React, { useState } from "react";
import {signIn} from "../../redux/actions/authAction";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';


function Login(props){
    let history = useHistory();


	let [email,setEmail] = useState("");
	let [password,setPassword] = useState("");
	let [alert,setAlert] = useState("");

	const handleEmailChange = e=>{
		setEmail(e.target.value);
	}

	const handlePasswordChange = e=>{
		setPassword(e.target.value);
	}

	const handleSubmit = (email,password)=>{
		props.signIn(email,password).then((role)=>{
			console.log("HELLOLOOO");
			history.push(`/${role}`);
		}).catch((err)=>{
			console.log(err);
			setAlert("Email or Password Incorrect");
		});

	}

    return (
	<>
	<AppBar style={{minHeight:"80px",paddingLeft:"10px",paddingRight:"10px"}} className="d-flex justify-content-center">
		<h1 style={{color:"white"}}>Foodista</h1>

	</AppBar>
	<div className="container d-flex align-items-center" style={{height:"100vh"}}>
		<div className="row d-flex justify-content-center align-items-center w-100 h-100">
			<div className="col-sm-0 col-md-4"/>
			<div className="col-sm-12 col-md-4">
				<form noValidate autoComplete="off">
					<div style={{padding:"30px",minWidth:"400px",paddingTop:"50px",paddingBottom:"50px"}} elevation={3}>
						<div className="d-flex flex-column">
							
							<div className="d-flex align-items-center" style={{marginBottom:"15px"}}>
								<div style={{fontSize:"32px"}}>Login</div>
								<div style={{alignSelf:"flex-end",paddingLeft:"10px",fontSize:"12px",marginBottom:"8px"}}>   New here ? <a href="/signup">Create a Account</a></div>
							</div>

							{alert == "" ? null : <Alert severity="error">{alert}</Alert>}

							<TextField onChange={handleEmailChange} style={{marginBottom:"10px"}} required label="Email"/>
							<TextField onChange={handlePasswordChange} style={{marginBottom:"20px"}} required type="password" label="password"/>
							<Button onClick={handleSubmit} variant="contained" color="secondary">
								Login
							</Button>

						</div>
					</div>
				</form>
			</div>
			<div className="col-sm-0 col-md-4"/>
		</div>
	</div>
	
	</>
	);
}


const mapStateToProps = (state)=>{
	return {user:state.user};
}

const mapDispatchToProps = (dispatch) =>{
	return {
		signIn: (email,password) => dispatch(signIn(email,password))
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);