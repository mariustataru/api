import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import {   useContext, useState } from "react";
import { productsContext, URL } from "./ProductList";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';





export const DeleteProduct = ({productId} : {productId : number}) => {

  const {setProducts} = useContext<ProductContextType>(productsContext)
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id : number) => {
    try{
       await axios.delete(`${URL}/${id}`);
       setProducts((prevProducts : Product[]) => prevProducts.filter(product => product.id !== id))
       handleClose();
    }
    catch (error){
        console.error("",error)
    }

  }


  return(
    <>
    <Button variant="outlined" onClick={handleClickOpen}>
      <DeleteIcon />
    </Button>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Alert"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You sure you want to delete this product?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Not sure</Button>
        <Button onClick={() => handleDelete(productId)} autoFocus>
          I'm positive
        </Button>
      </DialogActions>
    </Dialog>
  </>
  )
}

export default DeleteProduct;