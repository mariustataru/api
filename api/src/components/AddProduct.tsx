import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useContext } from "react";
import axios from "axios";
import  { URL, productsContext } from "./ProductList.tsx";

export default function AddProduct() {

  const {setProducts} = useContext<ProductContextType>(productsContext)
  const {products} = useContext<ProductContextType>(productsContext)

  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleDescriptionChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleTitleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
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
      setProducts([...products,response.data])
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