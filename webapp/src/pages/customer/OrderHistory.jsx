import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import Button from "../../components/Button";
import "../../index.css";
import { axios_authenticated as axios } from "../../axios/axios-config";

export default function Orders(props) {


  let data = [
    {
      _id: "60c98b987b4f15991f02f37d",
      status: "Ready",
      user_id: "60c5e7a44774d66567334287",
      user_name: "admin",
      bill: 2000,
      fooditems: [
          {
              ingredients: [
                  "[\"asd\",\"asd\"]"
              ],
              _id: "60c8755bd5b7c11308471a63",
              name: "Coke 250 ml",
              price: 500,
              category: {
                  "_id": "60c8755bd5b7c11308471a64",
                  "name": "drinks"
              },
              description: "Whats a dinner without a Coke ?",
              avatar: "avatar1623749979845.jpeg",
              __v: 0
          }
      ]
    }
  ]

  // [
  //   {
  //     orderNo: 1,
  //     foodItems: [
  //       { item: "Weshi Zinger", quantity: 3, price: 300 },
  //       { item: "coke", quantity: 2, price: 30 },
  //     ],
  //     total: 960,
  //     status: "Queued",
  //   },
  // ]
  

  let [orders, setOrders] = useState([]);

  useEffect(()=>{
    axios.get("/api/customer/orderHistory").then((res)=>{
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
          onClick={() => props.history.push("/delivery/chatsupport")}
        />
      </ProfileHeader>
      <h1 style={{ marginTop: "60px", marginLeft: "60px" }}>Orders</h1>
      {orders.map((item) => (
        <OrderBox item={item} />
      ))}
    </div>
  );
}

function OrderBox({ item }) {
  /*  const [click, setClick] = useState(true);
  useEffect(() => {
    console.log("item:", item);
    console.log("click:", click);
  }, [click]); */
  let [myState, setMyState] = useState(item);

  function Clicked(index) {
    console.log("Clicked!", myState);
    let item = [false, false, false];
    item[index] = true;
    let newState = { ...myState };
    newState.status = item;
    setMyState(newState);
  }
  return (
    <>
      <div className="orderbox">
        <div className="orderbox_details">
          <p>Order# {myState.orderNo}</p>
          {myState.foodItems.map((i) => (
            <p>
              {i.name} x {i.quantity} - Rs {i.price}
            </p>
          ))}
          <p>Total - {myState.total}</p>
        </div>
      </div>
      <hr style={{ borderTop: "1px solid black" }}></hr>
    </>
  );
}
