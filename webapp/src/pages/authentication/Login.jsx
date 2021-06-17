import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MenuBar from "../../components/MenuBar";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/actions/authAction";
import { useHistory } from "react-router-dom";
import { axios } from "../../axios/axios-config";

function Login(props) {
  let history = useHistory();
  let dispatch = useDispatch();

  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");

  let submitForm = () => {
    console.log(phone);
    console.log(password);

    axios
      .post("/api/user/login", {
        phone: phone,
        password: password,
      })
      .then(({ data }) => {
        console.log(data);
        let id = data.user._id;
        let pfp = data.user.avatar;
        let name = data.user.name;
        let role = data.user.role;
        let token = data.access_token;

        dispatch(signIn(id, pfp, name, phone, role, token));

        if (role === 0) {
          history.push("/admin");
        } else if (role === 1) {
          history.push("/cashier");
        } else if (role === 2) {
          history.push("/customer");
        }
      })
      .catch((err) => {
        alert("Either User Name Or Password is Inccorect. Please try again");
        console.log(err);
      });
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div style={{ height: "auto" }}>
        <MenuBar>
          <Button menuButton label="Home" />
        </MenuBar>
      </div>
      <div
        className="d-flex justify-content-center w-100"
        style={{ marginTop: "100px" }}
      >
        <div style={{ width: "345px" }}>
          <div>
            <div>
              <h4
                style={{ fontWeight: "bold", display: "inline" }}
                className="text-center"
              >
                Login
              </h4>
              <small>
                <p style={{ display: "inline", paddingLeft: "10px" }}>
                  Dont have a account ?{" "}
                </p>
                <small>
                  <a href="/" style={{ display: "inline" }}>
                    Create New
                  </a>
                </small>
              </small>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <TextField
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: "100%", marginTop: "20px" }}
              label="Phone no"
              type="number"
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", marginTop: "20px" }}
              label="Password"
              type="password"
            />
          </div>
          <div style={{ paddingTop: "10px", paddingLeft: "20px" }}>
            <Button label="Login" redButton onClick={() => submitForm()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
