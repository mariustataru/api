
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [title,setTitle] = useState('');
  const [description, setDescription] = useState('');

const handleDescriptionChange = (event) => {
  setDescription(event.target.value)
}
console.log(description)

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  console.log(title);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    useEffect(() => {
     axios.post('https://dummyjson.com/products', {
      title : title,
      description : description 
     }).then((res) => {
      console.log(res.data); setOpen(false)
    }).catch((error) => console.error(' Error adding product ' , error))
    })

  };
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} >
        Create a product
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Fill Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the fields before adding
          </DialogContentText>
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
          />
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Abort</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
