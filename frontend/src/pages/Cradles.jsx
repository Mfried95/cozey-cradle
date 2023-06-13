import { useEffect, useState } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import '../styles/cradle.css';

function Cradles() {
  const location = useLocation();
  const [cradles, setCradles] = useState([]);
  const [filteredCradles, setFilteredCradles] = useState([]);
  const [searchBrand, setSearchBrand] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [uniqueCities, setUniqueCities] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueBrands, setUniqueBrands] = useState([]);

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

  const handleProductClick = (productId) => {
    // Navigate to the product page using the product ID
    window.location.href = `/product/${productId}`;
  };

  useEffect(() => {
    if (location.state) {
      const { selectedCity, selectedCategory, selectedRentDuration, selectedBrand } = location.state;
      setSearchBrand(selectedBrand);
      setSearchCity(selectedCity);
      setSearchCategory(selectedCategory);
    }
  }, [location.state]);


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
      </div>

      <div className='filtered-cradles'>
        {filteredCradles.map(cradle => (
          <div
            key={cradle._id}
            className="product-card"
          >
            <img src={cradle.image} alt="" onClick={() => handleProductClick(cradle._id)} />
            <h3>{cradle.name}</h3>
            <span className='price'> From ${cradle.price} / day</span>
            <Button variant="outlined" onClick={() => {
              console.log(`rent this product ${cradle.brand} ${cradle._id}`);
            }}>Book now!</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cradles;