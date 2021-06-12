import React from "react";

export default function StatusCard(props){

    let bgColor = props.done ? "#176B02" : "#BABABA";

    return (
        <div style={{width:"258px",minHeight:"38px",background:bgColor,color:"white",marginTop:"10px",marginBottom:"10px"}} className="d-flex justify-content-center align-items-center">
            {props.label}
        </div>
    )
}