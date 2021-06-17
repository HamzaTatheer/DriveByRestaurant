import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ArrowIcon from "@material-ui/icons/ArrowBack";
import StatusCard from "../../components/Customer/StatusCards";
import Cart from "../../components/Customer/Cart";
import ProfileHeader from "../../components/ProfileHeader";
import SearchBar from "material-ui-search-bar";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FoodCard from "../../components/Customer/FoodCard";
import Button from "../../components/Button";
import CheckoutItem from "../../components/CheckOutItem";
import WaitingAnimation from "../../components/Customer/WaitingAnimation";
import ChatBox from "../../components/Customer/ChatBox";
import { useSelector } from "react-redux";
import { useHistory,useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import {axios_authenticated as axios} from "../../axios/axios-config";
import baseUrl from "../../utilities/baseUrl";
import {setOrder,removeOrder} from "../../redux/actions/orderAction";
import {clearCart} from "../../redux/actions/cartAction";
import {useDispatch} from "react-redux";
import io from "socket.io-client";


function MenuScreen(props) {

  let history = useHistory();
  let dispatch = useDispatch();
  let [foodItems,setFoodItems] = useState([]);

  useEffect(()=>{
    
    let fetchFoodItems = () => axios.get("api/menu/menu").then((res)=>{
      console.log(res);
      let data = res.data;
      setFoodItems(data.map((d)=>{
        return {id:d._id, picture:d.avatar,name:d.name,category:d.category,price:d.price,description:d.description}
      }))
    }).catch((err)=>{
      console.log(err);
    });


    axios.post("/api/customer/activeOrders").then((res)=>{
      console.log("RES");
      console.log(res.data);
      console.log(res.data.length);
      if(res.data.length === 0)//no order placed before
      {
        fetchFoodItems();
      }
      else
      {
        console.log(res.data);
        dispatch(setOrder({id:res.data[0]._id,status:res.data[0].status}));
        history.push("/customer/status");
      }

    }).catch((err)=>{
      alert("Error Getting your active orders");
      console.log(err)
      console.log("----");
      history.push("/customer/orderHistory");
    })


  },[])

  let [search, setSearch] = useState("");
  let [category, changeCategory] = useState("All");

  let categories = Array.from(new Set(foodItems.map((item) => item.category)));

  let filteredListByCategory = (arr) => {
    if (category == "All") return arr;

    return arr.filter((item) => {
      if (item.category == category) return true;
      else return false;
    });
  };

  let filteredListBySearch = (arr) => {
    if (search == "") return arr;
    else
      return arr.filter((item, index) => {
        return item.name.includes(search);
      });
  };

  let [isOpen, setOpen] = useState(false);

  return (
    <div>
      <Dialog fullWidth open={isOpen} onClose={() => setOpen(false)}>
        <div style={{ textAlign: "center", margin: "10px" }}>
          <h1>Most Ordered Today</h1>
        </div>
      </Dialog>

      <div
        style={{
          position: "fixed",
          zIndex: 1,
          bottom: "20px",
          right: "30px",
          cursor: "pointer",
        }}
        onClick={() => props.history.push("/customer/checkout")}
      >
        <Cart />
      </div>

      <ProfileHeader>
        <Button
          label="View Cart"
          onClick={() => props.history.push("/customer/checkout")}
        />
      </ProfileHeader>

      <div>
        <div className="row no-gutters" style={{ marginTop: "30px" }}>
          <div className="col-sm-0 col-md-1"></div>

          <div style={{ marginTop: "20px" }}>
            <div class="row row-cols-12">
              {filteredListBySearch(filteredListByCategory(foodItems)).map(
                ({ id,picture, name, description, category, price }) => (
                  <div class="col mb-4">
                    <FoodCard
                      id={id}
                      picture={`${baseUrl}/public/uploads/food_pictures/${picture}`}
                      name={name}
                      description={description}
                      category={category}
                      price={price}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="col-sm-0 col-md-1"></div>
      </div>
    </div>
  );
}

function Checkout(props) {
  let cart_items = useSelector((state) => state.cart);
  let history = useHistory();
  let dispatch = useDispatch();

  let confirmOrder = () => {
    if (cart_items.length == 0) {
      alert("No Items in Cart. Select from Menu");
      return;
    }

    console.log(cart_items);


    let req_body = [];

    for(let i=0;i<cart_items.length;i++)
    while(cart_items[i].quantity > 0){
      req_body.push(cart_items[i].id);
      cart_items[i].quantity--;
    }

    console.log(req_body);
    axios.post("/api/customer/orderFood",req_body).then((res)=>{
      alert("Order placed Succesfuly");
      dispatch(setOrder({id:res.data._id,status:res.data.status}));
      dispatch(clearCart());
      history.push({pathname:"/customer/status",state: { id: res.data._id }});
    }).catch((res)=>{
      console.log(res.body);
      dispatch(clearCart());
    })
    //props.history.push("/customer/status");
  };

  return (
    <>
      <div style={{ marginTop: "50px" }}>
        <a
          onClick={() => history.push("/customer/")}
          style={{
            display: "flex",
            width: "fit-content",
            color: "black",
            cursor: "pointer",
          }}
        >
          <ArrowIcon
            style={{
              marginTop: "18px",
              marginRight: "10px",
              marginLeft: "30px",
            }}
          />{" "}
          <h1>
            <b>Menu</b>
          </h1>
        </a>
      </div>

      <div style={{ marginTop: "50px" }}>
        <div className="row">
          <div className="col-xs-0 col-md-2" />
          <div className="col-xs-12 col-md-8">
            {cart_items.map((obj) => (
              <CheckoutItem key={obj.id} id={obj.id} quantity={obj.quantity} />
            ))}
            <div className="w-100 d-flex justify-content-center">
              <Button onClick={() => confirmOrder()} label="Confirm Order" />
            </div>
          </div>
          <div className="col-xs-0 col-md-2" />
        </div>
      </div>
    </>
  );
}

function Status(props) {
  
  let history = useHistory();

  let order = useSelector((state)=>state.order);

  let orderId = order.id;


  let dispatch = useDispatch();

  //socket.on("order-status-change") {change status}
  //side case. if status is Done
  //go to next page i.e order history

  const socket = io("http://localhost:9001", {reconnectionDelayMax: 10000});
  useEffect(()=>{
    socket.on("status_change",(d)=>{
      //d = JSON.parse(d);
      if(orderId === d.order_id){
        setStatus(d.order_status);
        if(d.order_status === "Ready"){
          setTimeout(()=>{
            history.push("/customer/orderHistory");
            dispatch(removeOrder());
          },2000);
        }
      }

    })

    return ()=>{
      socket.off("message");
    }

  },[orderId,socket,removeOrder,history,dispatch])



  let [status, setStatus] = useState(order.status);

  useEffect(()=>{
    axios.post("/api/customer/getOrderStatus",{_id:orderId}).then((res)=>{
      setStatus(res.data.status);
    }).catch((err)=>{
      console.log(err);
    });
  },[])

  

  // setTimeout(() => {
  //   setStatus("cooking");
  //   setTimeout(() => {
  //     setStatus("done");
  //     setTimeout(() => {
  //       history.push("/customer/orderHistory");
  //     }, 1000);
  //   }, 3000);
  // }, 2000);

  return (
    <>
      <ProfileHeader>
        <Button
          onClick={() => props.history.push("/customer/chat")}
          label="Chat with Customer Support"
        />
      </ProfileHeader>

      <div className="row no-gutters">
        <div className="col-xs-0 col-md-2" />
        <div className="col-xs-12 col-md-8 d-flex flex-column align-items-center">
          <h1 className="text-center" style={{ marginTop: "60px" }}>
            Order Id: {orderId}
          </h1>
          <WaitingAnimation />
          <StatusCard done={status == "Queued"} label="Queued" />
          <StatusCard done={status == "Cooking"} label="Cooking" />
          <StatusCard done={status == "Ready"} label="Ready" />
        </div>
        <div className="col-xs-0 col-md-2" />
      </div>
    </>
  );
}


function Chat(props) {

  let history = useHistory();
  const location = useLocation();


  return (
    <>
      <ProfileHeader>
        <Button
          onClick={() => props.history.push("/customer/status")}
          label="Go Back To Order Status"
        />
      </ProfileHeader>
      <div>
        <div className="row no-gutters">
          <div className="col-xs-0 col-md-1" />
          <div className="col-xs-12 col-md-10 d-flex flex-column align-items-center">
            <div className="w-100">
              <h1 className="text-center" style={{ marginTop: "60px" }}>
                {location.state && location.state.id ? `Order# ${location.state.id}` : ''}
              </h1>
              <ChatBox />
            </div>
          </div>
          <div className="col-xs-0 col-md-1" />
        </div>
      </div>
    </>
  );
}

export default function OrderFoodScreen() {
  const { path } = useRouteMatch();

  return (
    <Route>
      <Switch>
        <Route exact path={[path, `${path}order`]} component={MenuScreen} />
        <Route exact path={`${path}checkout`} component={Checkout} />
        <Route exact path={`${path}status`} component={Status} />
        <Route exact path={`${path}chat`} component={Chat} />
      </Switch>
    </Route>
  );
}
