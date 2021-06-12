import React,{useState} from "react";
import MenuBar from "../components/MenuBar";
import Button from "../components/Button";
import Welcome from "../components/Home/Welcome";
import Slider from "../components/Home/Slider";
import Features from "../components/Home/Features";
import OrderNow from "../components/Home/OrderNow";
import Footer from "../components/Home/Footer";

export default function Home(){
    return (
        <>
        <MenuBar>
            <Button menuButton label="Home"/>
            <Button menuButton label="Features"/>
            <Button menuButton label="Contact Us"/>
        </MenuBar>


        <Welcome/>
        <Slider/>
        <Features/>
        <OrderNow/>
        <Footer/>

        </>
    );
}