import React from 'react';

export default function MenuItem({label,selected})
{

    let style={};
    if (selected == true){
        style = {width:"90%",height:"100%",background:"white",borderBottomLeftRadius:"10px",borderTopLeftRadius:"10px"};
    }
    else {
        style = {width:"90%",height:"100%",color:"white"};
    }




    return (
        
        <div className="d-flex" style={{height:"50px"}}>
        <div style={{width:"10%",height:"100%"}}>
        </div>
        <div className="d-flex justify-content-center align-items-center" style={style}>
            {label}
        </div>
        </div>
    );
}