import {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectVariants( {categories, setCategory, category}) {


  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(category)
  };



  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={category}
          onChange={handleChange}
          label="Filter"
        >
          {categories.map((category) =>
          <MenuItem value={category}>{category}</MenuItem> )}

        </Select>
      </FormControl>
    </div>
  );
}