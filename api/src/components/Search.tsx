import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SearchField({searchedItem, setSearchedItem}) {

  const handleChange = (event) => {
    setSearchedItem(event.target.value)
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handleChange} value={searchedItem}/>
    </Box>
  );
}