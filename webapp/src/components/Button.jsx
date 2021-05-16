import React from "react";

export default function Button(props){
   if(props.menuButton==true){
        return (
            <div onClick={props.onClick} className="menuButton" style={{padding:"20px"}}>
                    {props.label}                
            </div>
        );
   }
   else if(props.plusButton==true){
        return (
            <div onClick={props.onClick} style={{cursor:"pointer",fontSize:"1.2em",width:"38px",height:"32px",background:"#E35A5A",color:"white"}} className="d-flex justify-content-center align-items-center">
                    +             
            </div>
        );
   }
   else if(props.minusButton==true){
    return (
        <div onClick={props.onClick} style={{cursor:"pointer",fontSize:"1.2em",width:"38px",height:"32px",background:"#E35A5A",color:"white"}} className="d-flex justify-content-center align-items-center">
                -         
        </div>
    );
  }
  else {
       return (
        <div>
        <input onClick={props.onClick} style={{background:"white",borderRadius:"10px",outline:"none",padding:"10px 20px 10px 20px"}} type="button" value={props.label}/>  
        </div>
       );
   }
}