import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../assets/salad.png";

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
                                <h3 style={{paddingTop:"30px"}}>Teriyaki</h3>
                                <p>
                                    Lorem ipsum doir oir Lorem ipsum doir oir Lorem ipsum doir oir Lorem ipsum doir oir Lorem ipsum doir oir Lorem ipsum doir oir Lorem ipsum doir oir Lorem ipsum doir oir 
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="row">
                            <div className="col-md-12 col-lg-5">
                                <img style={{width:"400px"}} src={img1}/>
                            </div>
                            <div className="col-md-8 col-lg-5 text-left">
                                <h3 style={{paddingTop:"30px"}}>Teriyaki</h3>
                                <p>
                                    Lorem ipsum doir oir Lorem ipsum doir oir Lorem ipsum doir oir Lorem ipsum doir oir Lorem ipsum doir oir Lorem ipsum doir oir Lorem ipsum doir oir Lorem ipsum doir oir 
                                </p>
                            </div>
                        </div>
                    </div>

                </Carousel>
            </div>
    );
}