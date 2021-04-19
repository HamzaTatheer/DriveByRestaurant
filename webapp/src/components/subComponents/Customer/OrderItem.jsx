import React from "react";


export default function OrderItem({img,name,price,amount,onAdd,onMinus,onCancel}){



    return (
        <>
        <div className="d-flex align-items-center">
            <div style={{width:"55%"}}>
                {img} {name} 
            </div>

            <div className="d-flex justify-content-around" style={{width:"45%"}}>
                    <div className="d-flex align-items-center justify-content-center" style={{paddingLeft:"5px",paddingRight:"5px",border:"1px solid green",borderRadius:"10px",alignSelf: "center"}}>    
                        <div style={{cursor:"pointer",marginLeft:"2px"}} onClick={onAdd}>+</div> <div style={{minWidth:"30px",textAlign:"center",cursor:"pointer"}}> {amount} </div> <div style={{marginRight:"2px",cursor:"pointer"}} onClick={onMinus}>-</div> 
                    </div>

                    <div className="d-flex align-items-center">
                        <div style={{padding:"5px"}}>
                            {price*amount}
                        </div>

                        <div onClick={onCancel} style={{color:"lightgray",cursor:"pointer"}}>
                            x
                        </div>
                    </div>

            </div>

        </div>
        </>
    );


}

