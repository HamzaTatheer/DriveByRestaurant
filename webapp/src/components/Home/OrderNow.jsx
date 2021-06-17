import React from "react";
import Burger from "../../assets/burger.png";
import Button from "../../components/Button";
import {useHistory} from "react-router-dom";

export default function OrderNow(){

    let history = useHistory();

    return (
        <div className="text-center" style={{marginTop:"50px"}}>
            <img src={Burger} width="350px"/>
            <h3>Order Now</h3>
            <Button redButton label="Order Now" onClick={()=>history.push("/login")}/>
        </div>
    );
}