
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
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";


function MenuScreen(props){


    let foodItems = [
        {id:1,name:"zinger burger",category:"burger",price:600,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel ligula nec mauris vestibulum pulvinar in vitae magna. Nam scelerisque tortor metus, blandit fringilla urna tempor quis."},
        {id:2,name:"wehshi burger",category:"burger",price:600,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel ligula nec mauris vestibulum pulvinar in vitae magna. Nam scelerisque tortor metus, blandit fringilla urna tempor quis."},
        {id:3,name:"coke",category:"drink",price:90,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel ligula nec mauris vestibulum pulvinar in vitae magna. Nam scelerisque tortor metus, blandit fringilla urna tempor quis."},
    ]

    
    let [search,setSearch] = useState('');
    let [category,changeCategory] = useState("All");
    
    let categories = Array.from(new Set(foodItems.map(item=>item.category)));

    let filteredListByCategory = (arr)=>{

        if(category=="All")
            return arr;


        return arr.filter((item)=>{
            if(item.category == category)
                return true;
            else
                return false;
        });
    }

    let filteredListBySearch = (arr)=>{
            if(search == '')
                return arr;
            else
                return arr.filter((item,index)=>{
                    return item.name.includes(search);
            });
    }


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
                <SearchBar onChange={(val)=>setSearch(val)} style={{width:"60vw"}}/>
                    <Select style={{width:"20vw",paddingLeft:"10px"}} value={category} onChange={(e)=>changeCategory(e.target.value)}>
                            <MenuItem value="All">All</MenuItem>
                            {categories.map((name,index)=><MenuItem value={name}>{name}</MenuItem>)}
                    </Select>
                </div>
                
                
                <div style={{marginTop:"20px"}}>
                    

                    <div class="row row-cols-12">
                        {filteredListBySearch(filteredListByCategory(foodItems)).map(({id,name,description,category,price})=>
                        <div class="col mb-4">
                            <FoodCard id={id} name={name} description={description} category={category} price={price}/>
                        </div>
                        )}
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


    let cart_items = useSelector((state)=>state.cart);
    let history = useHistory();

    let confirmOrder = ()=>{
        if(cart_items.length == 0){
            alert("No Items in Cart. Select from Menu");
            return;
        }
        props.history.push("/customer/status")
    }

    return (
        <>
                    <div style={{marginTop:"50px"}}>
                        <a onClick={()=>history.push("/customer/")} style={{display:"flex",width:"fit-content",color:"black",cursor:"pointer"}}>
                            <ArrowIcon style={{marginTop:"18px",marginRight:"10px",marginLeft:"30px"}}/> <h1><b>Menu</b></h1>
                        </a>
                    </div>

                    <div style={{marginTop:"50px"}}>
                        
                        <div className="row">
                            
                            <div className="col-xs-0 col-md-2"/>
                            <div className="col-xs-12 col-md-8">
                                {cart_items.map((obj)=><CheckoutItem id={obj.id} quantity={obj.quantity}/>)}
                                <div className="w-100 d-flex justify-content-center">
                                    <Button onClick={()=>confirmOrder()} label="Confirm Order"/>
                                </div>

                            </div>
                            <div className="col-xs-0 col-md-2"/>
                        </div>
                    </div>
        </>
    );
}

function Status(props){

    //socket.on("order-status-change") {change status}
    //side case. if status is Done
    //go to next page i.e order history
    
    let history = useHistory();
    let [status,setStatus] = useState('pending');

    setTimeout(()=>{
        setStatus("cooking");
        setTimeout(()=>{
            setStatus("done")
            setTimeout(()=>{
                history.push("/customer/orderHistory");
            },1000);
        },3000);
    },2000)

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
                    <StatusCard done={status=="pending"} label="Pending"/>
                    <StatusCard done={status=="cooking"} label="Cooking"/>
                    <StatusCard done={status=="done"} label="Done"/>
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
