import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const SearchBar = () => {
  const options = [
    { title: 'City' },
    { title: 'Category' },
    { title: 'Rent Duration' },
    { title: 'Brand' },
  ];

  return (
    <Autocomplete
      multiple
      id="search-bar"
      options={options}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Search"
          placeholder="Search..."
        />
      )}
    />
  );
};

export default SearchBar;
