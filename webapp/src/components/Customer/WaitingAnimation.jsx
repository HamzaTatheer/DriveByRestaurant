import React, { useEffect,useState } from "react";

export default function WaitingAnimation(){

    let [index,setIndex] = useState(0);
    let frames=[
        [" ","  "," "],
        [". ","  "," "],
        [". ",". "," "],
        [". ",". ","."]
    ]

    let plus = ()=>{
        setIndex((val)=>(val+1)%4);
    }

    useEffect(()=>{
        let id =setInterval(()=>{
            plus()
        },2000)

        return ()=>{
            clearInterval(id);
        }
        
    },[plus])
    
    
    return (
        <div className="d-flex" style={{width:"50px",height:"40px",marginLeft:"20px"}}>
            <span>{frames[index]}</span>
        </div>
    )
}