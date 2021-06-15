import React,{useState} from "react";
import Appbar from "./Appbar";
import Button from "./Button";
import MenuIcon from "@material-ui/icons/Menu";
import CancelIcon from "@material-ui/icons/Cancel";

export default function MenuBar(props){

    let [drawerOpen,setDrawerOpen] = useState(false);


    return (
        <>
        <Appbar style={props.fixed ? {position:"fixed",width:"100%",zIndex:"1000"}:{}}>

        <div className="home-desktop-menu">
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:"5px",paddingLeft:"10px",paddingRight:"10px"}}>

                        <div style={{color:"white"}}>
                            <h3 style={{cursor:"pointer"}} onClick={()=>window.location.href="/"}>Hardees</h3>
                        </div>

                        <div className="d-flex" style={{color:"white"}}>
                            {props.children}
                        </div>
                        
                </div>
        </div>

        <div style={{position:"relative"}} className="home-mobile-menu">


            <div style={{paddingTop:"10px",paddingLeft:"10px",paddingRight:"10px"}} className="d-flex justify-content-between align-items-center">
                <div style={{marginBottom:"0.5rem"}} onClick={()=>setDrawerOpen((val)=>!val)}>
                    {drawerOpen == false ?<MenuIcon/>:<CancelIcon/> }
                </div>

                <div className="w-100 text-center">
                    <h3>Hardees</h3>
                </div>
            </div>

            {
            drawerOpen==true ?

                <div style={{position:"absolute",width:"100%",background:"#E35A5A",zIndex:"10"}}>
                    {props.children}
                </div> 
                :
                null
            }


        </div>
        </Appbar>
        </>
    )
}