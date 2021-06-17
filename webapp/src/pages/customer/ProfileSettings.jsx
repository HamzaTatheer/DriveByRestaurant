import React, { useState } from "react";
import { TextField, Avatar } from "@material-ui/core";
import Button from "../../components/Button";
import { axios_authenticated as axios } from "../../axios/axios-config";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../redux/actions/authAction";

export default function ProfileSettings() {
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let dispatch = useDispatch();

  return (
    <div
      style={{
        display: "flex",
        height: "70vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div className="d-flex align-items-center" style={{ margin: "20px" }}>
          <Avatar />
          <span style={{ paddingLeft: "40px" }}>Change Profile Picture</span>
        </div>

        <div className="d-flex p2" style={{ margin: "40px" }}>
          <TextField
            placeholder="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Button
            redButton
            label="Save"
            onClick={() => {
              axios
                .post("/api/user/changeUserName", {
                  name: name,
                })
                .then(() => {
                  alert("Successful");
                  dispatch(updateUserDetails({ name: name }));
                })
                .catch((err) => console.log(err));
            }}
          />
        </div>

        <div className="d-flex p2" style={{ margin: "40px" }}>
          <TextField
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            redButton
            label="Save"
            onClick={() => {
              axios
                .post("/api/user/changePassword", {
                  newPassword: password,
                  confirmPassword: password,
                })
                .then(() => alert("Successful"))
                .catch((err) => console.log(err));
            }}
          />
        </div>
      </div>
    </div>
  );
}
