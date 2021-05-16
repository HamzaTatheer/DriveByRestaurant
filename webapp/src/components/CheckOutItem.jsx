import React from "react";
import Button from "./Button";
import {useDispatch, useSelector} from "react-redux";
import {addToCart,removeFromCart} from "./../redux/actions/cartAction";

export default function CheckoutItem({id,quantity}){

    let dispatch = useDispatch();

    return (
        <div>
        <div style={{justifyContent:"space-evenly",alignItems:"center"}} className="d-flex">
            <div>Wehshi Burger</div>
            <div><b>Rs. 395</b></div>
            <div>
                <Button plusButton onClick={()=>dispatch(addToCart(id))}/>
            </div>
            <div>{quantity}</div>
            <div><Button minusButton onClick={()=>dispatch(removeFromCart(id))}/></div>
        </div>
        <hr/>
    </div>
    );
}