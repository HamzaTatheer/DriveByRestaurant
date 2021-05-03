import React from "react";
import Button from "./Button";

export default function CheckoutItem(){
    return (
        <div>
        <div style={{justifyContent:"space-evenly",alignItems:"center"}} className="d-flex">
            <div>Wehshi Burger</div>
            <div><b>Rs. 395</b></div>
            <div>
                <Button plusButton/>
            </div>
            <div>4</div>
            <div><Button minusButton/></div>
        </div>
        <hr/>
    </div>
    );
}