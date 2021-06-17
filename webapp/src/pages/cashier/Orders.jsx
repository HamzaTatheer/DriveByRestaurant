import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import Button from "../../components/Button";
import "../../index.css";

export default function Orders(props) {
  let [orders, setOrders] = useState([
    {
      orderNo: 1,
      foodItems: [
        { item: "Weshi Zinger", quantity: 3, price: 300 },
        { item: "coke", quantity: 2, price: 30 },
      ],
      total: 960,
      status: [true, false, false],
    },
    {
      orderNo: 2,
      foodItems: [
        { item: "Shaitani Zinger", quantity: 2, price: 500 },
        { item: "Shaitani Zinger", quantity: 2, price: 500 },
        { item: "Shaitani Zinger", quantity: 2, price: 500 },
        { item: "Shaitani Zinger", quantity: 2, price: 500 },
        { item: "Shaitani Zinger", quantity: 2, price: 500 },
        { item: "Shaitani Zinger", quantity: 2, price: 500 },
        { item: "Shaitani Zinger", quantity: 2, price: 500 },
        { item: "Shaitani Zinger", quantity: 2, price: 500 },
        { item: "Shaitani Zinger", quantity: 2, price: 500 },
      ],
      total: 1000,
      status: [true, false, false],
    },
    {
      orderNo: 3,
      foodItems: [
        { item: "Weshi Zinger", quantity: 3, price: 300 },
        { item: "coke", quantity: 2, price: 30 },
      ],
      total: 960,
      status: [true, false, false],
    },
    {
      orderNo: 4,
      foodItems: [
        { item: "Weshi Zinger", quantity: 3, price: 300 },
        { item: "coke", quantity: 2, price: 30 },
      ],
      total: 960,
      status: [true, false, false],
    },
  ]);
  const [stylz, setStylz] = useState(null);
  console.log(orders);
  return (
    <div>
      <ProfileHeader>
        <Button
          label="Chat with Customer Support"
          onClick={() => props.history.push("/cashier/chatsupport")}
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
    console.log("C    licked!", myState);
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
          <p>Order#{myState.orderNo}</p>
          {myState.foodItems.map((i) => (
            <p>
              {i.item} x {i.quantity} - Rs {i.price}
            </p>
          ))}
          <p>Total - {myState.total}</p>
        </div>
        <div className="orderbox_status">
          <p>Select Status</p>
          <div style={{ marginTop: "10px" }}>
            {" "}
            <Button
              onClick={() => Clicked(0)}
              mystyle={{ width: "50%", height: "20%" }}
              redButton={myState.status[0]}
              blackButton={!myState.status[0]}
              label="Pending"
            ></Button>
          </div>
          <div style={{ marginTop: "10px" }}>
            {" "}
            <Button
              onClick={() => Clicked(1)}
              mystyle={{ width: "50%", height: "20%" }}
              redButton={myState.status[1]}
              blackButton={!myState.status[1]}
              label="Cooking"
            ></Button>
          </div>
          <div style={{ marginTop: "10px" }}>
            {" "}
            <Button
              onClick={() => Clicked(2)}
              mystyle={{ width: "50%", height: "20%" }}
              redButton={myState.status[2]}
              blackButton={!myState.status[2]}
              label="Done"
            ></Button>
          </div>
        </div>
      </div>
      <hr style={{ borderTop: "1px solid black" }}></hr>
    </>
  );
}
