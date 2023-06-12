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
    fetch('http://localhost:3000/api/cities')
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error('Failed to fetch cities:', error));

    fetch('http://localhost:3000/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Failed to fetch categories:', error));

    fetch('http://localhost:3000/api/rentDurations')
      .then((response) => response.json())
      .then((data) => setRentDurations(data))
      .catch((error) => console.error('Failed to fetch rent durations:', error));

    fetch('http://localhost:3000/api/brands')
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error('Failed to fetch brands:', error));
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
            <MenuItem key={city.id} value={city.id}>
              {city.name}
            </MenuItem>
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
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
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
            <MenuItem key={duration.id} value={duration.id}>
              {duration.name}
            </MenuItem>
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
            <MenuItem key={brand.id} value={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select a brand</FormHelperText>
      </FormControl>
    </div>
  );
};

export default SearchBar;

