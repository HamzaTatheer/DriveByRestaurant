import React from "react";
import {signIn} from "../../redux/actions/authAction";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

function Login(){
    let history = useHistory();
    return (<h1>Login</h1>)
}


const mapStateToProps = (state)=>{
	return {user:state.user};
}

const mapDispatchToProps = (dispatch) =>{
	return {
		signIn: data => dispatch(signIn(data))
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);