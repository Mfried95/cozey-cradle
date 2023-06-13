import { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, FormHelperText, Select, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "../styles/searchbar.css"

const SearchBar = () => {

  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [rentDurations, setRentDurations] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRentDuration, setSelectedRentDuration] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => {
        setCities([...new Set(data.map(product => product.city))]);
        setCategories([...new Set(data.map(product => product.category))]);
        setRentDurations([...new Set(data.map(product => product.rentDuration))]);
        setBrands([...new Set(data.map(product => product.brand))]);
      })
      .catch(error => console.error('Failed to fetch products:', error));
  }, []);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setShowSubmitButton(true);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setShowSubmitButton(true);
  };

  const handleRentDurationChange = (event) => {
    setSelectedRentDuration(event.target.value);
    setShowSubmitButton(true);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setShowSubmitButton(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Do something with the selected options
    console.log('Selected City:', selectedCity);
    console.log('Selected Category:', selectedCategory);
    console.log('Selected Rent Duration:', selectedRentDuration);
    console.log('Selected Brand:', selectedBrand);

    // Reset the form
    setSelectedCity('');
    setSelectedCategory('');
    setSelectedRentDuration('');
    setSelectedBrand('');
    setShowSubmitButton(false);

    // Navigate to the "Cradles" page
    navigate('/Cradles', { state: { selectedCity, selectedCategory, selectedRentDuration, selectedBrand } });
  };

  return (
    <div className='search-container'>
      <FormControl>
        <InputLabel id="city-label">City</InputLabel>
        <Select 
          labelId="city-label"
          id="city-select"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <MenuItem value="">All</MenuItem>
          {cities.map((city, index) => (
            <MenuItem key={city+index} value={city}>
              {city}
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
          {categories.map((category, index) => (
            <MenuItem key={category+index} value={category}>
              {category}
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
          {rentDurations.map((duration, index) => (
            <MenuItem key={duration+index} value={duration}>
              {duration}
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
          {brands.map((brand, index) => (
            <MenuItem key={brand+index} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select a brand</FormHelperText>
      </FormControl>

      {showSubmitButton && (
        <Button variant="contained" onClick={handleFormSubmit}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default SearchBar;