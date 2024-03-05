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



export const UpdateProduct = ({productId} : {productId :  number}) => {

  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleDescriptionChange : React.ChangeEventHandler<HTMLInputElement> = (event) => {
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


  const {setProducts} = useContext<ProductContextType>(productsContext)
  const {products} = useContext<ProductContextType>(productsContext)

  const handleUpdate = async (id : number) => {
    try{
      await axios.put(`${URL}/${id}`, {
        title : title,
        description : description
      });
      setProducts((prevProducts : Product[])  => 
        {
          const newProducts = [...prevProducts]
         if (title !== '') prevProducts[id-1].title = title
         else prevProducts[id-1].title = prevProducts[id-1].title
         if (description !== '') prevProducts[id-1].description = description
         else prevProducts[id-1].description = prevProducts[id-1].description
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
          defaultValue={products[productId-1]?.title}
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
          defaultValue={products[productId-1]?.description}
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