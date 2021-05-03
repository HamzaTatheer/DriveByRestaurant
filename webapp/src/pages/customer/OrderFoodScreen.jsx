
import React,{useState} from "react";
import {Route, Switch,useRouteMatch } from "react-router-dom";
import ArrowIcon from "@material-ui/icons/ArrowBack";
import StatusCard from "../../components/Customer/StatusCards";
import Cart from "../../components/Customer/Cart";
import ProfileHeader from "../../components/ProfileHeader";
import SearchBar from "material-ui-search-bar";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FoodCard from "../../components/Customer/FoodCard";
import Button from "../../components/Button";
import CheckoutItem from "../../components/CheckOutItem";
import WaitingAnimation from "../../components/Customer/WaitingAnimation";
import ChatBox from "../../components/Customer/ChatBox";



function MenuScreen(props){
    return (
    <div>
        
    <div style={{position:"fixed",zIndex:1,bottom:"20px",right:"30px",cursor:"pointer"}} onClick={()=>props.history.push("/customer/checkout")}>
        <Cart/>
    </div>
    
    <ProfileHeader>
                <Button label="View Cart" onClick={()=>props.history.push("/customer/checkout")}/>
    </ProfileHeader>

    <div>
        
        <div className="row no-gutters" style={{marginTop:"30px"}}>
            <div className="col-sm-0 col-md-1">
            </div>

            <div className="col-sm-12 col-md-10">
                <div className="d-flex justify-content-between">
                <SearchBar style={{width:"60vw"}}/>
                <Select style={{width:"20vw",paddingLeft:"10px"}} value={1}>
                        <MenuItem value={1}>All</MenuItem>
                        <MenuItem value={2}>Pizza</MenuItem>
                        <MenuItem value={3}>Drinks</MenuItem>
                </Select>
                </div>
                
                
                <div style={{marginTop:"20px"}}>
                    

                    <div class="row row-cols-12">
                        <div class="col mb-4">
                            <FoodCard/>
                        </div>
                        <div class="col mb-4">
                            <FoodCard/>
                        </div>
                        <div class="col mb-4">
                            <FoodCard/>
                        </div>

                    </div>


                </div>

            </div>


            <div className="col-sm-0 col-md-1">
            </div>




        </div>           
    </div>
    </div>

    )
}


function Checkout(props){
    return (
        <>
                    <div style={{marginTop:"50px"}}>
                        <a href="/customer/" style={{display:"flex",width:"fit-content",color:"black"}}>
                            <ArrowIcon style={{marginTop:"18px",marginRight:"10px",marginLeft:"30px"}}/> <h1><b>Menu</b></h1>
                        </a>
                    </div>

                    <div style={{marginTop:"50px"}}>
                        
                        <div className="row">
                            
                            <div className="col-xs-0 col-md-2"/>
                            <div className="col-xs-12 col-md-8">
                                <CheckoutItem/>
                                <CheckoutItem/>
                                <CheckoutItem/>
                                
                                <div className="w-100 d-flex justify-content-center">
                                    <Button onClick={()=>props.history.push("/customer/status")} label="Confirm Order"/>
                                </div>

                            </div>
                            <div className="col-xs-0 col-md-2"/>
                        </div>
                    </div>
        </>
    );
}

function Status(props){
    return (
        <>
            <ProfileHeader>
                <Button onClick={()=>props.history.push("/customer/chat")} label="Chat with Customer Support"/>
            </ProfileHeader>

            <div className="row no-gutters">
                
                <div className="col-xs-0 col-md-2"/>
                <div className="col-xs-12 col-md-8 d-flex flex-column align-items-center">
                <h1 className="text-center" style={{marginTop:"60px"}}>Order# 3</h1>
                    <WaitingAnimation/>
                    <StatusCard done label="Pending"/>
                    <StatusCard label="Cooking"/>
                    <StatusCard label="Done"/>
                </div>
                <div className="col-xs-0 col-md-2"/>
            </div>
        </>
    );
}

function Chat(props){
    return (
        <>
            <ProfileHeader>
                <Button onClick={()=>props.history.push("/customer/status")} label="Go Back To Order Status"/>
            </ProfileHeader>
            <div>
                <div className="row no-gutters">
                
                <div className="col-xs-0 col-md-1"/>
                <div className="col-xs-12 col-md-10 d-flex flex-column align-items-center">
                <div className="w-100">
                    <h1 className="text-center" style={{marginTop:"60px"}}>Order# 3</h1>
                        <ChatBox/>
                </div>
                </div>
                <div className="col-xs-0 col-md-1"/>
            </div>

            </div>
        </>
    );
}


export default function OrderFoodScreen(){

    const { path } = useRouteMatch();

    return (
        <Route>
            <Switch>
                <Route exact path={[path,`${path}order`]} component={MenuScreen} />
                <Route exact path={`${path}checkout`} component={Checkout} />
                <Route exact path={`${path}status`} component={Status} />
                <Route exact path={`${path}chat`} component={Chat} />
            </Switch>
        </Route>
    )
}
