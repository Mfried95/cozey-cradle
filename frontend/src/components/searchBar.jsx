import { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, FormHelperText, Select, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/searchbar.css';

const SearchBar = () => {

  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [brands, setBrands] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => {
        setCities([...new Set(data.map(product => product.city))]);
        setCategories([...new Set(data.map(product => product.category))]);
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

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setShowSubmitButton(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Do something with the selected options
    console.log('Selected City:', selectedCity);
    console.log('Selected Category:', selectedCategory);
    console.log('Selected Start Date:', startDate);
    console.log('Selected End Date:', endDate);
    console.log('Selected Brand:', selectedBrand);

    // Reset the form
    setSelectedCity('');
    setSelectedCategory('');
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedBrand('');
    setShowSubmitButton(false);

    // Navigate to the "Cradles" page
    navigate('/Cradles', { state: { selectedCity, selectedCategory, startDate, endDate, selectedBrand } });
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
        <DatePicker className='datePicker' selected={startDate} onChange={date => setStartDate(date)} />
      
        <FormHelperText className='startDate'>Start Date</FormHelperText>
      </FormControl>

        <FormControl>
        <DatePicker className='datePicker' selected={endDate} onChange={date => setEndDate(date)} />
        <FormHelperText className='endDate'>End Date</FormHelperText>
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