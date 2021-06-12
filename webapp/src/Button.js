import React from "react";


function Button(props){


    console.log(props);

    let onClick = ()=>{
        props.onClick();
    }



    if(props.redButton==true){

        return (
            <div className="rest-button" onClick={onClick} style={{background:"red",width:"200px",height:"300px",borderRadius: "15px"}}>
                <h1>
                    {props.label}
                </h1>
            </div>
        );

    }
    else if(props.blueButton==true){

        return (
            "Blue"
        )
    }
    

}


export default Button;
