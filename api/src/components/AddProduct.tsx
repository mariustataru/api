import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import axios from "axios";
import { URL } from "./ProductList.tsx";

export default function AddProduct({onProductAdded}) {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");



  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event : Event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${URL}/add`, { title : title, description : description });
      console.log(response.data);
      onProductAdded(response.data);
      handleClose();
    } catch (error) {
      console.error("Error sending email:", error);
    }

  };

  return (
    <React.Fragment>
      {" "}
      <Button variant="outlined" onClick={handleClickOpen}>
        Create a product{" "}
      </Button>{" "}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Fill Out</DialogTitle>{" "}
        <DialogContent>
          {" "}
          <DialogContentText>
            Please fill in the fields before adding{" "}
          </DialogContentText>{" "}
          <TextField
            onChange={handleTitleChange}
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            fullWidth
            variant="standard"
          />{" "}
          <TextField
            onChange={handleDescriptionChange}
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            fullWidth
            variant="standard"
          />{" "}
        </DialogContent>{" "}
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Abort</Button>
          <Button type="submit">Add</Button>{" "}
        </DialogActions>{" "}
      </Dialog>{" "}
    </React.Fragment>
  );
}