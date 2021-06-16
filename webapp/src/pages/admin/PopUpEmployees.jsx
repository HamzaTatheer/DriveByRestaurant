import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MyButton from "../../components/Button";
import { FormControl, FormHelperText, InputLabel } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import { axios_authenticated } from "../../axios/axios-config";

export default function PopUpFoodItem({ open, handleClose, handleSave }) {
  let [name, setName] = useState("");
  let [phoneNo, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [image, setImage] = useState(null);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <FormControl></FormControl>
        <DialogTitle id="form-dialog-title">
          <h2>
            <b>Cashier Details</b>
          </h2>
        </DialogTitle>
        <div style={{ display: "flex" }}>
          <AccountBoxIcon style={{ flex: "10%" }} />
          <div style={{ paddingRight: "60px" }}>
            <Input type="file" onChange={(e) => setImage(e.target.value)} />
          </div>
        </div>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            value={name}
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phoneno"
            label="Phone No"
            type="text"
            value={phoneNo}
            fullWidth
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="text"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </DialogContent>
        <DialogActions>
          <MyButton
            onClick={() =>
              handleSave({
                name,
                phoneNo,
                password,
                image,
              })
            }
            label="Save"
            redButton
          ></MyButton>
        </DialogActions>
      </Dialog>
      <Button />
    </div>
  );
}
