import React,{useEffect, useState} from "react";
import MenuBar from "../components/MenuBar";
import Button from "../components/Button";
import Welcome from "../components/Home/Welcome";
import Slider from "../components/Home/Slider";
import Features from "../components/Home/Features";
import OrderNow from "../components/Home/OrderNow";
import Footer from "../components/Home/Footer";
import {useHistory,useLocation} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";

export default function Home(props){
    const history = useHistory();
    const location = useLocation();

    let [isOpen, setOpen] = useState(false);

    useEffect(()=>{
        const query = new URLSearchParams(location.search);
        const driveby = query.get('driveby')
        if(driveby !== null){
            setOpen(true);
        }
    },[])

    return (
        <>
        <MenuBar fixed>
            <Button menuButton label="Home" onClick={()=>window.location.href="/#home"}/>
            <Button menuButton label="Features" onClick={()=>window.location.href="/#features"}/>
            <Button menuButton label="Contact Us" onClick={()=>window.location.href="/#contactus"}/>
        </MenuBar>

        <Dialog fullWidth open={isOpen} onClose={() => setOpen(false)}>
            <div style={{ textAlign: "center", margin: "10px" }}>
            <h1>Welcome To Hardess</h1>
            <br/>
            <br/>
            <p>Place a order after logging in. you will be updated real time about your order details. You can collect your order once it is ready</p>
            </div>
        </Dialog>

        <div id="home">
            <Welcome/>
        </div>
            <Slider/>
        <div id="features">
            <Features/>
        </div>
            <OrderNow/>
        <div id="contactus">
            <Footer/>
        </div>
        </>
    );
}