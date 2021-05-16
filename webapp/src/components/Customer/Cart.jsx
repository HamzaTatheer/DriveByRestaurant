import React from "react";
import CartIcon from "@material-ui/icons/ShoppingCart"
import {useSelector} from "react-redux";

export default function Cart(){
    
    let cartItems = useSelector(state=>state.cart);
    
    return(
        <div style={{position:"relative"}}>
        <div style={{borderRadius:"6px",border:"0.5px solid grey",background:"white",color:"black",position:"absolute",paddingLeft:"6px",paddingRight:"6px",right:"-15px",top:"-10px"}}>
            <small>{cartItems.reduce((total,obj)=>total+obj.quantity,0)}</small>
        </div>
        <div style={{padding:"10px",borderRadius:"2px",background:"#E35A5A"}}>
            <CartIcon/>
        </div>
        </div>
    );
}