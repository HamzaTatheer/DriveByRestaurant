import React from "react";

export default function Button(props){
   if(props.menuButton==true){
        return (
            <div className="menuButton" style={{padding:"20px"}}>
                    {props.label}                
            </div>
        );
   }
   else {
       throw Error("Button type should be passed as props");
   }
}