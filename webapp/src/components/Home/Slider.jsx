import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../assets/food1.png";
import img2 from "../../assets/burger1.jpeg";


export default function Slider(){
    return (
            <div className="container">
                <h3 style={{paddingTop:"50px",paddingBottom:"30px"}}>Our New Dishes</h3>

                <Carousel interval={10} emulateTouch showArrows  showThumbs={false}>
                    <div>
                        <div className="row">
                            <div className="col-md-12 col-lg-5">
                                <img style={{width:"400px"}} src={img1}/>
                            </div>
                            <div className="col-md-8 col-lg-5 text-left">
                                <h3 style={{paddingTop:"30px"}}>American chopsoy</h3>
                                <p>
                                American chop suey is an American pasta casserole made with ground beef, macaroni and a seasoned tomato sauce, found in the cuisine of New England and other regions of the United States.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="row">
                            <div className="col-md-12 col-lg-5">
                                <img style={{width:"400px"}} src={img2}/>
                            </div>
                            <div className="col-md-8 col-lg-5 text-left">
                                <h3 style={{paddingTop:"30px"}}>Wehshi Burger</h3>
                                <p>
                                    Cooked with our special sauce. This Burger is filled with onions and lettuce and beef. 
                                </p>
                            </div>
                        </div>
                    </div>

                </Carousel>
            </div>
    );
}