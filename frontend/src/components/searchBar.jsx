import { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, FormHelperText, Select } from '@mui/material';

const SearchBar = () => {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [rentDurations, setRentDurations] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRentDuration, setSelectedRentDuration] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => {
        setCities(['All', ...new Set(data.map(product => product.city))]);
        setCategories(['All', ...new Set(data.map(product => product.category))]);
        setRentDurations(['All', ...new Set(data.map(product => product.rentDuration))]);
        setBrands(['All', ...new Set(data.map(product => product.brand))]);
      })
      .catch(error => console.error('Failed to fetch products:', error));
  }, []);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleRentDurationChange = (event) => {
    setSelectedRentDuration(event.target.value);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="city-label">City</InputLabel>
        <Select
          labelId="city-label"
          id="city-select"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <MenuItem value="">All</MenuItem>
          {cities.map((city) => (
            <MenuItem value={city}>{city}</MenuItem>
          ))}
        </Select>
        <FormHelperText>Select a city</FormHelperText>
      </FormControl>

      <FormControl>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category) => (
            <MenuItem value={category}>{category}</MenuItem>
          ))}
        </Select>
        <FormHelperText>Select a category</FormHelperText>
      </FormControl>

      <FormControl>
        <InputLabel id="rent-duration-label">Rent Duration</InputLabel>
        <Select
          labelId="rent-duration-label"
          id="rent-duration-select"
          value={selectedRentDuration}
          onChange={handleRentDurationChange}
        >
          <MenuItem value="">All</MenuItem>
          {rentDurations.map((duration) => (
            <MenuItem value={duration}>{duration}</MenuItem>
          ))}
        </Select>
        <FormHelperText>Select a rent duration</FormHelperText>
      </FormControl>

      <FormControl>
        <InputLabel id="brand-label">Brand</InputLabel>
        <Select
          labelId="brand-label"
          id="brand-select"
          value={selectedBrand}
          onChange={handleBrandChange}
        >
          <MenuItem value="">All</MenuItem>
          {brands.map((brand) => (
            <MenuItem value={brand}>{brand}</MenuItem>
          ))}
        </Select>
        <FormHelperText>Select a brand</FormHelperText>
      </FormControl>
    </div>
  );
};

export default SearchBar;
