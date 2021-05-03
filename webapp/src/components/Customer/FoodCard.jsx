import React from "react";
import Burger from "../../assets/customer/burger.png";

export default function FoodCard(){
    return (
        <div class="card">
        <div className="d-flex justify-content-center">
            <div style={{height:"250px",width:"100%",background:"#FFF9F9"}} className="d-flex justify-content-center align-items-center">
                <img src={Burger} width="60%"/>
            </div>
        </div>

        <div class="card-body">
            <div className="d-flex justify-content-between">
                <div>
                    <h5 class="card-title">Spaghetti</h5>
                </div>
                <div>
                    <b>Rs. 300</b>
                </div>
            </div>
            <p class="card-text">
                <small>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel ligula nec mauris vestibulum pulvinar in vitae magna. Nam scelerisque tortor metus, blandit fringilla urna tempor quis.
                </small>
            </p>
            <div className="d-flex justify-content-center">
                <a href="#" class="btn btn-primary">Add To Cart</a>
            </div>
        </div>
    </div>
    );
}