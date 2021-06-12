import React from "react";

export default function Appbar(props){
    return (
        <div className="appBar" style={props.style}>
                {props.children}
        </div>
    );
}