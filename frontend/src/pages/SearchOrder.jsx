import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SearchOrder = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedBooking, setMatchedBooking] = useState(null);
  const [error, setError] = useState("");
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/bookings")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => console.error("Failed to fetch bookings:", error));
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (searchTerm.length !== 5) {
      setError("Must enter a 5-digit booking ID");
      return;
    }

    const foundBooking = bookings.find(
      (booking) => booking._id.endsWith(searchTerm)
    );

    if (foundBooking) {
      setMatchedBooking(foundBooking);
      setError("");

      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${foundBooking.productID}`
        );
        const product = await response.json();
        setProductData(product);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    } else {
      setMatchedBooking(null);
      setError("No match found");
    }

    setSearchTerm("");
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setError("");
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSearch}>
    <TextField
      label="Search by booking ID"
      variant="outlined"
      value={searchTerm}
      onChange={handleInputChange}
      onClick={clearSearchTerm}
    />
    <Button variant="contained" type="submit">
      Search
    </Button>
    {matchedBooking ? (
      <div className="bookings-container">
        <h2>Order details for ID: {matchedBooking._id.slice(-4)}</h2>
        <table>
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {productData && (
                  <img
                    src={productData.image}
                    alt={productData.name}
                    style={{ width: "100px" }}
                  />
                )}
              </td>
              <td>{productData && productData.name}</td>
              <td>{productData && productData.duration}</td>
            </tr>
          </tbody>
        </table>
      </div>
    ) : (
      <p>{error}</p>
    )}
  </form>
  );
};

export default SearchOrder;