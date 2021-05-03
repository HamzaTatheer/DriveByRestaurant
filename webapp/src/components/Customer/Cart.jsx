import React from "react";
import CartIcon from "@material-ui/icons/ShoppingCart"


export default function Cart(){
    return(
        <div style={{position:"relative"}}>
        <div style={{borderRadius:"6px",border:"0.5px solid grey",background:"white",color:"black",position:"absolute",paddingLeft:"6px",paddingRight:"6px",right:"-15px",top:"-10px",zIndex:"20"}}>
            <small>1</small>
        </div>
        <div style={{padding:"10px",borderRadius:"2px",background:"#E35A5A"}}>
            <CartIcon/>
        </div>
        </div>
    );
}