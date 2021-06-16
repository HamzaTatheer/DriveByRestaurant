import React from "react";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import {Avatar} from "@material-ui/core";
import {useReducer, useSelector} from "react-redux";
import baseUrl from "../utilities/baseUrl";

export default function ProfileHeader(props){

    let user = useSelector(state=>state.user);

    return (
        <>
        <div>
           <div style={{minHeight:"130px",paddingLeft:"50px",paddingRight:"50px",background:"black",color:"white"}} className="row no-gutters d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center"> <Avatar><img src={`${baseUrl}/public/uploads/profile_pictures/${user.pfp}`}/></Avatar> <span style={{display:"inline",paddingLeft:"10px"}}>Welcome {user.name}</span></div>
                <div className="d-flex justify-content-center align-items-center">
                    {props.children}
                </div>
            </div>
        </div>
        </>
    )
}