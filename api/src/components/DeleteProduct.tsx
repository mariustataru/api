import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useContext } from "react";
import { productsContext, URL } from "./ProductList";






export const DeleteProduct = ({productId}) => {

  const {setProducts} = useContext(productsContext)

  const handleDelete = async (id) => {
    try{
       await axios.delete(`${URL}/${id}`);
       setProducts(prevProducts => prevProducts.filter(product => product.id !== id))
    }
    catch (error){
        console.error("",error)
    }

  }


  return(
  <Button onClick={() => handleDelete(productId)} variant="outlined" startIcon={<DeleteIcon />}>
  </Button>
  )
}

export default DeleteProduct;