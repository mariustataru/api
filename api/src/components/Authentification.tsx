import  {Button}  from "@mui/material";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {ChangeEvent, useState, useContext} from "react";
import { authentificatedContextType } from "../models/product";
import { authentificatedContext,  } from "./ProductList";

export const URLAuth = 'https://dummyjson.com/auth/login'



export const Authentification =  () => {

  const {setIsAuthentificated} = useContext<authentificatedContextType>(authentificatedContext)
 

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  
  const handleUsernameInput = (event : ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }
  
  const handlePasswordInput = (event : ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value)
  }

  
  
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const getUser = async (event : Event) => {
    event.preventDefault();
    try{
    const response =  await axios.post(URLAuth,{
          username: username,
          password : password
        })
        setIsAuthentificated(true)
        console.log(response.data)
          handleClose();
        }   
      catch(error){
        console.error(error)

      }
  }

  return(
    <>
       {" "}
    <Button variant="outlined" onClick={handleClickOpen}>
      Login{" "}
    </Button>{" "}
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: getUser,
      }}
    >
      <DialogTitle>Fill Out</DialogTitle>{" "}
      <DialogContent>
        {" "}
        <DialogContentText>
          Please fill in the fields before adding{" "}
        </DialogContentText>{" "}
        <TextField
          onChange={handleUsernameInput}
          autoFocus
          required
          margin="dense"
          id="username"
          name="username"
          label="username"
          fullWidth
          variant="standard"
        />{" "}
        <TextField
          onChange={handlePasswordInput}
          autoFocus
          required
          margin="dense"
          id="password"
          name="password"
          label="password"
          fullWidth
          variant="standard"
        />{" "}
      </DialogContent>{" "}
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Abort</Button>
        <Button type="submit">Login</Button>{" "}
      </DialogActions>{" "}
    </Dialog>{" "}

  </>
    
  )
}

export default Authentification;