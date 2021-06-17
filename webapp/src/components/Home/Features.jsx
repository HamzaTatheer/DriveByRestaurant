import React from "react";
import img1 from "../../assets/waitress.png";
import img2 from "../../assets/restaurant_pic.png";


export default function Features(){
    return (
        <div className="row overflow-hidden" style={{marginTop:"100px"}}>
            <div className="col-md-12 col-lg-6" style={{height:"400px",padding:"0px"}}>
                <img src={img1} style={{width:"inherit",height:"inherit"}}/>
            </div>
            <div className="col-md-12 col-lg-6" style={{height:"400px",background:"#E35A5A",paddingTop:"110px",paddingLeft:"30px",color:"white"}}>
                    <h2>Introducing Waiterless Service</h2>
                    <p>
                    Scan Qr Code and your phone will take you to login screen. You can the order food and receive real time status about your Order
                    </p>
            </div>
            <div className="col-md-12 col-lg-6" style={{height:"400px",background:"#3F3F3F",paddingTop:"50px",paddingLeft:"30px",color:"white"}}>
                    <h2>About Us</h2>
                    <p>
                    Hardee's Restaurants LLC, is an American fast-food restaurant chain operated by CKE Restaurants Holdings, Inc. ("CKE") with locations primarily in the Southern and Midwestern United States.
                    </p>
            </div>
            <div className="col-md-12 col-lg-6" style={{height:"400px",background:"yellow",padding:"0px"}}>
                <img src={img2} style={{width:"inherit",height:"inherit"}}/>
            </div>
        </div>
    );
}