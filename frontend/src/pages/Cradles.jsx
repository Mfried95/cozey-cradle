import { useEffect, useState } from 'react';
import { FormControl, TextField, MenuItem, Button, FormHelperText } from '@mui/material';
import DatePicker from 'react-datepicker'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useLocation, Link } from 'react-router-dom';
import '../styles/cradle.css';

function Cradles(props) {
  const { handleBookings } = props;

  const location = useLocation();
  const [cradles, setCradles] = useState([]);
  const [filteredCradles, setFilteredCradles] = useState([]);
  const [searchBrand, setSearchBrand] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueBrands, setUniqueBrands] = useState([]);

  const notify = () => toast.success('Added to your bookings', {
    position: "top-right",
    autoClose: 800,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });


  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => {
        setCradles(data);
        setUniqueCities(['All', ...new Set(data.map(cradle => cradle.city))]);
        setUniqueCategories(['All', ...new Set(data.map(cradle => cradle.category))]);
        setUniqueBrands(['All', ...new Set(data.map(cradle => cradle.brand))]);
      })
      .catch(error => console.error('Failed to fetch products:', error));
  }, []);


  useEffect(() => {
    let filteredByBrand = cradles;
    if (searchBrand !== 'All') {
      filteredByBrand = filteredByBrand.filter(cradle =>
        cradle.brand.toLowerCase().includes(searchBrand.toLowerCase())
      );
    }

    let filteredByCity = filteredByBrand;
    if (searchCity !== 'All') {
      filteredByCity = filteredByCity.filter(cradle =>
        cradle.city.toLowerCase().includes(searchCity.toLowerCase())
      );
    }

    let filteredByCategory = filteredByCity;
    if (searchCategory !== 'All') {
      filteredByCategory = filteredByCategory.filter(cradle =>
        cradle.category.toLowerCase().includes(searchCategory.toLowerCase())
      );
    }

    setFilteredCradles(filteredByCategory);
  }, [cradles, searchBrand, searchCity, searchCategory]);

  const handleSearchBrandChange = (event) => {
    setSearchBrand(event.target.value);
  };

  const handleSearchCityChange = (event) => {
    setSearchCity(event.target.value);
  };

  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  // const handleProductClick = (productId) => {
  //   // Navigate to the product page using the product ID
  //   window.location.href = `/product/${productId}`;
  // };

  useEffect(() => {
    if (location.state) {
      const { selectedCity, selectedCategory, selectedRentDuration, selectedBrand } = location.state;
      setSearchBrand(selectedBrand);
      setSearchCity(selectedCity);
      setSearchCategory(selectedCategory);
    }
  }, [location.state]);

  const handleFormSubmit = event => {
    event.preventDefault();

    if (!startDate && !endDate) {
      toast.error('Please select both start and end dates.');
      return;
    }
  };

  return (
    <div>
      <h2>Our cradles</h2>
      <div className="filter-cradles-bar">
        <TextField
          select
          sx={{ width: '150px' }}
          label="Brand"
          value={searchBrand}
          onChange={handleSearchBrandChange}
        >
          {uniqueBrands.map(brand => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{ width: '150px' }}
          select
          label="Search by city"
          value={searchCity}
          onChange={handleSearchCityChange}
        >
          {uniqueCities.map(city => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          sx={{ width: '150px' }}
          label="Category"
          value={searchCategory}
          onChange={handleSearchCategoryChange}
        >
          {uniqueCategories.map(category => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <FormControl>
          <DatePicker
            className="datePicker"
            selected={startDate}
            onChange={date => setStartDate(date)}
            placeholderText="Start Date"
          />
          <FormHelperText className="startDate">Start Date</FormHelperText>
        </FormControl>

        <FormControl>
          <DatePicker
            className="datePicker"
            selected={endDate}
            onChange={date => setEndDate(date)}
            placeholderText="End Date"
          />
          <FormHelperText className="endDate">End Date</FormHelperText>
        </FormControl>

          <Button variant="contained" onClick={handleFormSubmit}>
            Submit
          </Button>
      </div>

      <div className='filtered-cradles'>
        {filteredCradles.map(cradle => (
          <div
            key={cradle._id}
            className="product-card"
          >
            <div>
              <Link to={`/product/${cradle._id}`}>
                <img src={cradle.image} alt="" />
              </Link>
            </div>
            <h3>{cradle.brand}</h3>
            <span> From ${cradle.price} / day</span>
            <h3>{cradle.name}</h3>
            <span className='price'> From ${cradle.price} / day</span>
            <Button variant="outlined" sx={{
              color: "black",
              backgroundColor: "rgb(186, 148, 222)",
              padding: "8px",
              width: "150px",
              border: "solid grey 1px",
              "&:hover": {
                backgroundColor: "white",
                border: "solid grey 1px",
              },
            }} onClick={() => { handleBookings(cradle); notify() }}>Book now!</Button>
          </div>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Cradles;