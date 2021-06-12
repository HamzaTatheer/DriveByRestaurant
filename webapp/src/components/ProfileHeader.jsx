import React from "react";
import AccountBoxIcon from "@material-ui/icons/AccountBox";


export default function ProfileHeader(props){
    return (
        <>
        <div>
           <div style={{minHeight:"130px",paddingLeft:"50px",paddingRight:"50px",background:"black",color:"white"}} className="row no-gutters d-flex justify-content-between align-items-center">
                <div><AccountBoxIcon/> <span style={{display:"inline"}}>Welcome Hamza</span></div>
                <div className="d-flex justify-content-center align-items-center">
                    {props.children}
                </div>
            </div>
        </div>
        </>
    )
}