import React,{useState} from "react";
import MenuBar from "../components/MenuBar";
import Button from "../components/Button";
import Welcome from "../components/Home/Welcome";
import Slider from "../components/Home/Slider";
import Features from "../components/Home/Features";
import OrderNow from "../components/Home/OrderNow";
import Footer from "../components/Home/Footer";
import {useHistory} from "react-router-dom";

export default function Home(props){
    const history = useHistory();

    return (
        <>
        <MenuBar fixed>

            <Button menuButton label="Home" onClick={()=>window.location.href="/#home"}/>
            <Button menuButton label="Features" onClick={()=>window.location.href="/#features"}/>
            <Button menuButton label="Contact Us" onClick={()=>window.location.href="/#contactus"}/>
        </MenuBar>


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