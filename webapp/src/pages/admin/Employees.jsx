import React, { useState, useEffect } from "react";

import Button from "../../components/Button";
import ProfileHeader from "../../components/ProfileHeader";
import Burger from "../../../src/assets/customer/salad.png";
import PopUpEmployees from "./PopUpEmployees";
import { axios_authenticated as axios } from "../../axios/axios-config";
import baseUrl from "../../utilities/baseUrl";
function Employees(props) {
  let [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios
      .get("api/admin/getAllCashiers")
      .then((res) => {
        console.log(res);
        let data = res.data;
        setEmployees(
          data.map((d) => {
            console.log(d);
            return {
              id: d._id,
              image: d.avatar,
              name: d.name,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSave(item) {
    console.log(item);
    let newitem = { ...item };
    let formData = new FormData();
    formData.append("avatar", item.image);
    formData.append("name", item.name);
    formData.append("phone", item.phoneNo);
    formData.append("password", item.password);

    axios
      .post("api/admin/addCashier", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        newitem.id = res.data._id;
        newitem.image = res.data.avatar;
        setEmployees([...employees, newitem]);
      })
      .catch((err) => {
        console.log(err);
      });

    handleClose();
  }
  function removeItem(item) {
    let formData = new FormData();
    formData.append("id", item.id);
    axios
      .post("api/admin/removeCashier", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        const newItems = employees.filter((i) => i.id != item.id);
        setEmployees(newItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <ProfileHeader />
      <div
        style={{ display: "flex", alignItems: "baseline", paddingTop: "30px" }}
      >
        <div style={{ flex: "50%", paddingLeft: "30px" }}>
          <h1 style={{ fontWeight: "bold" }}>Cashiers</h1>
        </div>
        <div style={{ paddingRight: "30px" }}>
          <Button
            onClick={() => handleClickOpen()}
            blackButton
            label="Create New"
          />
          <PopUpEmployees
            handleClose={handleClose}
            handleSave={handleSave}
            open={open}
          />
        </div>
      </div>
      {employees.map((i) => (
        <>
          <Employee item={i} onDelete={removeItem} />{" "}
          <hr style={{ borderTop: "solid 1px black", width: "95%" }} />
        </>
      ))}
    </div>
  );
}

function Employee({ item, onDelete }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ flex: "25%", paddingTop: "50px", paddingLeft: "30px" }}>
        <img
          style={{ width: "150px" }}
          src={`${baseUrl}/public/uploads/profile_pictures/${item.image}`}
          alt=""
        />
      </div>
      <div style={{ flex: "50%", fontWeight: "bold", paddingTop: "50px" }}>
        <p>Name: {item.name}</p>
      </div>
      <div style={{ flex: "25%", paddingTop: "100px", paddingRight: "25px" }}>
        <Button onClick={() => onDelete(item)} redButton label="Remove" />
      </div>
    </div>
  );
}

export default Employees;
