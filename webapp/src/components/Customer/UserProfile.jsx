import React from "react";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { grey,green,pink } from '@material-ui/core/colors';
import pfp from "../../assets/customer/pfp.jpg";

function PFP(){
    return (
            <div style={{overflow:"hidden",height:"30px",width:"30px",borderRadius:"10px",background:"gray",marginRight:"10px"}}>
                <img src={pfp} width="100%"/>
            </div>
    )
}


export default function UserProfile(){
    return (
        <div className="d-flex align-items-center">
        <div>
            <PFP/>
        </div>
        
        <div style={{padding:"5px"}}>
            Hamza
        </div>
        
        <div>
            <MoreVertIcon style={{color:grey["300"]}}/>
        </div>
     </div>
    );
}