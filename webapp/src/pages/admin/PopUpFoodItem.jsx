import React, { useState, useEffect } from "react";
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
import { axios_authenticated as axios } from "../../axios/axios-config";

export default function PopUpFoodItem({ open, handleClose, handleSave }) {
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState("");
  let [price, setPrice] = useState("");
  let [image, setImage] = useState(null);

  let [categories, setCategories] = useState([]);

  function getCategoryId(name) {
    let cat = categories.find((c) => c.name === name);
    return cat.id;
  }
  useEffect(() => {
    axios
      .get("api/admin/getAllCategories")
      .then((res) => {
        console.log(res);
        let data = res.data;
        console.log("Response : ", res);
        setCategories(
          data.map((d) => {
            console.log(d);
            return {
              id: d._id,
              name: d.name,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            />
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
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {categories.map((i) => (
              <MenuItem value={i.name}>{i.name}</MenuItem>
            ))}
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
            onClick={() => {
              let cat = getCategoryId(category);
              handleSave({
                name,
                description,
                cat,
                catname: category,
                price,
                image,
              });
              setName("");
              setDescription("");
              setCategory("");
              setPrice("");
              setImage(null);
            }}
            label="Save"
            redButton
          ></MyButton>
        </DialogActions>
      </Dialog>
      <Button />
    </div>
  );
}
