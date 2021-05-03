
import React from "react";
import MenuBar from "./CustomerMenu";
import Cart from "../../components/Customer/Cart";
import ProfileHeader from "../../components/ProfileHeader";
import SearchBar from "material-ui-search-bar";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FoodCard from "../../components/Customer/FoodCard";




export default function CustomerDashboard(){
    return (
        <div>
        
            <div style={{position:"fixed",bottom:"20px",right:"30px"}}>
            <Cart/>
            </div>
        
        <MenuBar/>
        <ProfileHeader>
                    <div>
                        <input style={{background:"white",borderRadius:"10px",outline:"none",padding:"10px 20px 10px 20px"}} type="button" value="View Basket"/>
                    </div>
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