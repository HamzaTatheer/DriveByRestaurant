import React from "react";
import Order from "../../components/Customer/Order";
import MenuItem from "../../components/Customer/MenuItem";
import pasta from "../../assets/customer/pasta.png"
import salad from "../../assets/customer/salad.png"
import pizza from "../../assets/customer/pizza.png"
import burger from "../../assets/customer/burger.png"
import SearchBar from 'material-ui-search-bar';
import Hidden from '@material-ui/core/Hidden';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import UserProfile from "../../components/Customer/UserProfile";
import BestFoodDialog from "../../components/Customer/BestDeal";

function FoodItem({image}){
    
    let colors = ["#FFE9E9","#ECF0FF","#FFFEE9"];
    let selected =  colors[Math.floor(Math.random() * 3)]

    return (
        <div style={{position:"relative",height:"200px",width:"200px",background:selected,margin:"20px",borderRadius:"10px",display:"inline-block"}}>
            
            <div style={{position:"absolute",left:"20px",bottom:"15px"}}>
                <div>Burger</div>
                <div><b>Rs 500</b></div>
            </div>

            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <img style={{paddingBottom:"10px"}} height="100px" width="100px" src={image}/>
            </div>
        </div>
    )
}



export default function Customer(){
    return (
    <div>
        <BestFoodDialog/>
        <div className="row no-gutters" style={{height:"100vh"}}>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 customer_menu" style={{height:"100%",paddingBottom:"50px"}}>
                    
                    <div style={{color:"white",marginTop:"50px",textAlign:"center"}}>Pinsa Store</div>
                    <div style={{marginTop:"100px"}}>
                        <MenuItem selected label="Menu"/>
                        <MenuItem  label="Order History"/>
                        <MenuItem label="Settings"/>
                    </div>
            </div>


            <div className="col-xs-10 col-sm-10 col-lg-7">
                <Hidden mdUp>
                    <div style={{width:"100%",marginTop:"10px",paddingRight:"50px",display:"flex",justifyContent:"flex-end"}}>
                    <UserProfile/>
                    </div>
                </Hidden>
                <div style={{marginTop:"90px"}}>
                <div style={{display:"flex",paddingLeft:"50px",paddingRight:"50px",marginRight:"0px",marginBottom:"-20px",alignItems:"center",justifyContent:"space-between"}}>

                    <div style={{fontSize:"20px"}}>Select Meal to order</div>
                    <SearchBar
                    style={{width:"300px"}}
                    onRequestSearch={()=>console.log("Hello")}
                    placeholder="Search.."
                    autoFocus
                    />
                </div>
                
                <div style={{marginTop:"20px",marginLeft:"40px"}}>
                <FoodItem image={pasta}/>
                <FoodItem image={pizza}/>
                <FoodItem image={burger}/>
                <FoodItem image={salad}/>
                <FoodItem image={pasta}/>
                <FoodItem image={pasta}/>
                </div>
                </div>
            </div>
            

            <Hidden mdUp>
                <div style={{position:"absolute",right:"10px",bottom:"10px",zIndex:2,padding:"10px",border:"1px solid",borderRadius:"5px"}}>
                    <ShoppingCartIcon/>
                </div>
            </Hidden>

            <Hidden only={["xs","sm"]}>
                <div className="col-xs-0 col-sm-0 col-md-3 col-lg-3">
                    <div style={{background:"#FCFCFC",padding:"20px",height:"100%"}}>
                        <Order/>
                    </div>
                </div>
            </Hidden>

        </div>

    </div>
    )
}