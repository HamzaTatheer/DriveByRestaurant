import React from "react";
import Button from '@material-ui/core/Button';
import OrderItem from "../subComponents/Customer/OrderItem";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MessageIcon from '@material-ui/icons/Message';
import { grey,green,pink } from '@material-ui/core/colors';
import UserProfile from "./UserProfile";


function Icon(props){
    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{background:"#E9FFEA",minWidth:"25px",minHeight:"25px",marginRight:"10px",borderRadius:"5px"}}>
            {props.children}
            </div>            
        </>
    )
}


export default function Order(){
    return (
        <div style={{height:"100%"}}>
            <div style={{marginBottom:"50px"}} className="d-flex justify-content-end">
                <UserProfile/>
            </div>


            <div className="d-flex justify-content-between align-items-center" style={{marginBottom:"30px"}}>
                <div><h3>My Order</h3></div>
                <div><a href="asd">Cancel</a></div>
            </div>

                <div className="d-flex flex-column">
                    <div className="d-flex align-items-center" style={{marginBottom:"5px"}}>
                        <Icon>
                            <LocationOnIcon style={{color:pink["500"],fontSize:17}}/>
                        </Icon>
                        <div>Dha Z Block Branch</div>
                    </div>
                    <div className="d-flex align-items-center" style={{marginBottom:"5px"}}>
                        <Icon>
                            <MessageIcon style={{color:pink["500"],fontSize:17}}/>
                        </Icon>
                        <div> Message For Order specification</div>
                    </div>

                </div>
                <hr/>
                    <div style={{marginLeft:"10px"}}>
                        <OrderItem img="img" name="Biryani" price={200} amount={2}/>
                        <OrderItem img="img" name="Burger" price={200} amount={2}/>
                    </div>
                <hr/>


            <div className="d-flex justify-content-between align-items-center" style={{marginBottom:"40px"}}>
                <div>Total</div>
                <div><b>Rs 400</b></div>
            </div>
            <div>
                <Button variant="contained" style={{background:"#FF007F",color:"white",borderRadius:"30px",width:"100%",fontWeight:"bold"}}>
                    Checkout
                </Button>
            </div>
        </div>
    );
}
