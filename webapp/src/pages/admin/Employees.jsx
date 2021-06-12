import React, { useState } from "react";

import Button from "../../components/Button";
import ProfileHeader from "../../components/ProfileHeader";
import Burger from "../../../src/assets/customer/salad.png";
import PopUpEmployees from "./PopUpEmployees";
function Employees(props) {
  let [employees, setEmployees] = useState([
    {
      name: "Abdullah",
      cnic: "12321435",
      image: Burger,
    },
    {
      name: "Abdullah",
      cnic: "12314235",
      image: Burger,
    },
    {
      name: "Abdullah",
      cnic: "13214235",
      image: Burger,
    },
    {
      name: "Abdullah",
      cnic: "23214235",
      image: Burger,
    },
  ]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSave(item) {
    let newitem = { ...item, image: Burger };
    setEmployees((employees) => [...employees, newitem]);
    handleClose();
  }
  function removeItem(item) {
    const newItems = employees.filter((i) => i.cnic != item.cnic);
    setEmployees(newItems);
  }
  return (
    <div>
      <ProfileHeader />
      <div style={{ display: "flex", paddingTop: "30px" }}>
        <div style={{ flex: "50%", paddingLeft: "30px" }}>
          <h1 style={{ fontWeight: "bold" }}>Cashiers</h1>
        </div>
        <div style={{ flex: "50%", paddingRight: "30px" }}>
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
        <img style={{ width: "150px" }} src={item.image} alt="" />
      </div>
      <div style={{ flex: "50%", fontWeight: "bold", paddingTop: "50px" }}>
        <p>Name: {item.name}</p>
        <p>CNIC : {item.cnic}</p>
      </div>
      <div style={{ flex: "25%", paddingTop: "100px", paddingRight: "25px" }}>
        <Button onClick={() => onDelete(item)} redButton label="Remove" />
      </div>
    </div>
  );
}

export default Employees;
