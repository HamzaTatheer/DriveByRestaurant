import React from "react";
import Burger from "../../assets/burger.png";

export default function OrderNow(){
    return (
        <div className="text-center" style={{marginTop:"50px"}}>
            <img src={Burger} width="350px"/>
            <h3>Order Now</h3>
        </div>
    );
}