import React, { useState, useEffect } from "react";

import Buttonned from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Button from "../../components/Button";
import ProfileHeader from "../../components/ProfileHeader";
import Burger from "../../../src/assets/customer/burger.png";
import PopUpFoodItem from "./PopUpFoodItem";
import { axios_authenticated as axios } from "../../axios/axios-config";
function FoodItems(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log("ELEO");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let [fooditems, setFoodItems] = useState([]);

  useEffect(() => {
    axios
      .get("api/admin/getAllFoodItems")
      .then((res) => {
        console.log(res);
        let data = res.data;
        console.log("Response : ", res);
        setFoodItems(
          data.map((d) => {
            console.log(d);
            return {
              id: d._id,
              name: d.name,
              category: d.category.name,
              image: d.avatar,
              price: d.price,
              description: d.description,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSave(item) {
    let newitem = { ...item, id: 5, image: Burger };
    console.log(newitem);
    setFoodItems((fooditems) => [...fooditems, newitem]);
    handleClose();
  }
  function removeItem(item) {
    console.log(item);
    let formData = new FormData();
    formData.append("id", item.id);
    axios
      .post("api/admin/removeFoodItem", { id: item.id })
      .then((res) => {
        console.log(res);
        const newItems = fooditems.filter((i) => i.id != item.id);
        setFoodItems(newItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <ProfileHeader />
      <div style={{ display: "flex", paddingTop: "30px" }}>
        <div style={{ flex: "50%", paddingLeft: "30px" }}>
          <h1 style={{ fontWeight: "bold" }}>Food Items</h1>
        </div>
        <div style={{ flex: "50%", paddingRight: "30px" }}>
          <Button
            onClick={() => handleClickOpen()}
            blackButton
            label="Create New"
          />
          <PopUpFoodItem
            handleClose={handleClose}
            handleSave={handleSave}
            open={open}
          />
        </div>
      </div>
      {fooditems.map((i) => (
        <>
          <FoodItem item={i} onDelete={removeItem} />{" "}
          <hr style={{ borderTop: "solid 1px black", width: "95%" }} />
        </>
      ))}
      <PopUpFoodItem />
    </div>
  );
}

function FoodItem({ item, onDelete }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ flex: "25%", paddingTop: "50px", paddingLeft: "30px" }}>
        <img style={{ width: "150px" }} src={item.image} alt="" />
      </div>
      <div style={{ flex: "50%", fontWeight: "bold", paddingTop: "50px" }}>
        <p>Name: {item.name}</p>
        <p>Category : {item.category}</p>
        <p>Price: Rs. {item.price}</p>
      </div>
      <div style={{ flex: "25%", paddingTop: "100px", paddingRight: "25px" }}>
        <Button onClick={() => onDelete(item)} redButton label="Remove" />
      </div>
    </div>
  );
}

export default FoodItems;
