import { Button } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import { productsContext, URL } from "./ProductList";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export const UpdateProduct = ({productId}) => {

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


  const {setProducts} = useContext(productsContext)
  const {products} = useContext(productsContext)

  const handleUpdate = async (id) => {
    try{
      await axios.put(`${URL}/${id}`, {
        title : title,
        description : description
      });
      setProducts(prevProducts => 
        {
          const newProducts = [...prevProducts]
          prevProducts[id-1].title = title;
          prevProducts[id-1].description = description;
          return newProducts
        });
      handleClose();
    }
    catch (error){
      console.error(error)
    }
  }

  return(
    <>
    {" "}
    <Button variant="outlined" onClick={handleClickOpen}>
      <EditIcon />
    </Button>{" "}
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleUpdate,
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
          label="title"
          fullWidth
          variant="standard"
          defaultValue={products[productId-1].title}
        />{" "}
        <TextField
          onChange={handleDescriptionChange}
          autoFocus
          required
          margin="dense"
          id="description"
          name="description"
          label="description"
          fullWidth
          variant="standard"
          defaultValue={products[productId-1].description}
        />{" "}
      </DialogContent>{" "}
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Abort</Button>
        <Button onClick = {() => handleUpdate(productId)} variant="outlined" > Update
  </Button>
      </DialogActions>{" "}
    </Dialog>{" "}
  </>

  )
}

export default UpdateProduct;