import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import Button from "../../components/Button";
import "../../index.css";
import io from "socket.io-client";
import {axios_authenticated as axios} from "../../axios/axios-config";

export default function Orders(props) {

  let [orders, setOrders] = useState([]);



  const socket = io("http://localhost:9001", {reconnectionDelayMax: 10000});
  useEffect(()=>{

    socket.on("status_change",()=>{
      axios.get("/api/cashier/orderHistory").then((res)=>{
        console.log(res.data);
        setOrders([])
        axios.get("/api/cashier/orderHistory").then((res)=>{
          console.log(res.data);

          setOrders(res.data.map((val,index)=>{
            return {
              orderNo:val._id,
              foodItems:val.fooditems.map((item)=>{
                return {name:item.name,price:item.price,quantity:3}
              }),
              total:val.bill,
              status:val.status
            }
          }))
        }).catch((err)=>{
          alert("There are new updates in order history");
          console.log(err);
        });
      }).catch((err)=>{

        console.log(err);
      });
    },[])

    return ()=>{
      socket.off("status_change");
    }

  },[socket,setOrders])

  let sendStatusUpdate = (id,status)=>{
    axios.post("/api/cashier/updateStatus",{orderId:id,status:status}).then(()=>{
      socket.emit("status_change",{order_id:id,order_status:status});
    }).catch(()=>{
      alert("Not Possible");
    })
  }





  useEffect(()=>{
    axios.get("/api/cashier/orderHistory").then((res)=>{
      console.log(res.data);
      setOrders(res.data.map((val,index)=>{
        return {
          orderNo:val._id,
          foodItems:val.fooditems.map((item)=>{
            return {name:item.name,price:item.price,quantity:3}
          }),
          total:val.bill,
          status:val.status
        }
      }))
    }).catch((err)=>{
      console.log(err);
    });
  },[])

  const [stylz, setStylz] = useState(null);
  console.log(orders);

  return (
    <div>
      <ProfileHeader>
        <Button
          label="Chat with Customer Support"
          onClick={() => props.history.push("/cashier/chatSupport")}
        />
      </ProfileHeader>
      <h1 style={{ marginTop: "60px", marginLeft: "60px" }}>Orders</h1>
      {orders.map((item) => (
        <OrderBox item={item} sendStatusUpdate={(id,status)=>sendStatusUpdate(id,status)}/>
      ))}
    </div>
  );
}
function OrderBox({ sendStatusUpdate,item }) {
  /*  const [click, setClick] = useState(true);
  useEffect(() => {
    console.log("item:", item);
    console.log("click:", click);
  }, [click]); */
  let [myState, setMyState] = useState(item);

  function Clicked(orderNo,status) {
    console.log("Clicked!", myState);
    let newState = { ...myState };
    newState.status = status;
    setMyState(newState);
    sendStatusUpdate(orderNo,status);
  }

  return (
    <>
      <div className="orderbox">
        <div className="orderbox_details">
          <p>Order#{myState.orderNo}</p>
          {myState.foodItems.map((i) => (
            <p>
              {i.name} x {i.quantity} - Rs {i.price}
            </p>
          ))}
          <p>Total - {myState.total}</p>
        </div>
        <div className="orderbox_status">
          <p>Select Status</p>
          <div style={{ marginTop: "10px" }}>
            {" "}
            <Button
              onClick={() => Clicked(myState.orderNo,"Queued")}
              mystyle={{ width: "50%", height: "20%" }}
              redButton={myState.status === "Queued"}
              blackButton={myState.status !== "Queued"}
              label="Pending"
            ></Button>
          </div>
          <div style={{ marginTop: "10px" }}>
            {" "}
            <Button
              onClick={() => Clicked(myState.orderNo,"Cooking")}
              mystyle={{ width: "50%", height: "20%" }}
              redButton={myState.status === "Cooking"}
              blackButton={myState.status !== "Cooking"}
              label="Cooking"
            ></Button>
          </div>
          <div style={{ marginTop: "10px" }}>
            {" "}
            <Button
              onClick={() => Clicked(myState.orderNo,"Ready")}
              mystyle={{ width: "50%", height: "20%" }}
              redButton={myState.status === "Ready"}
              blackButton={myState.status !== "Ready"}
              label="Ready"
            ></Button>
          </div>
        </div>
      </div>
      <hr style={{ borderTop: "1px solid black" }}></hr>
    </>
  );
}
