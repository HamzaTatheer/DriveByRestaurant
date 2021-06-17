import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import MyButton from "../../components/Button";
import Input from "@material-ui/core/Input";

export default function PopUpFoodItem({ open, handleClose, handleSave }) {
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState("");
  let [price, setPrice] = useState("");
  let [image, setImage] = useState(null);

  let [categories, setCategories] = useState([]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <h2>
            <b>Create Food Item</b>
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
            id="description"
            label="Description"
            type="text"
            value={description}
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            fullWidth
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value={"Fast Food"}>Fast Food</MenuItem>
            <MenuItem value={"Drinks"}>Drinks</MenuItem>
            <MenuItem value={"Sides"}>Sides</MenuItem>
          </Select>
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="text"
            fullWidth
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </DialogContent>
        <DialogActions>
          <MyButton
            onClick={() =>
              handleSave({
                name,
                description,
                category,
                price,
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
