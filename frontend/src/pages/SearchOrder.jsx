import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import moment from "moment";
import "../styles/search.css";

const SearchOrder = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedBooking, setMatchedBooking] = useState(null);
  const [error, setError] = useState("");
  const [productData, setProductData] = useState(null);
  


  useEffect(() => {
    fetch("/bookings")
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

    const foundBooking = bookings.find((booking) =>
      booking._id.endsWith(searchTerm)
    );

    if (foundBooking) {
      setMatchedBooking(foundBooking);
      setError("");
      console.log(foundBooking);

      if (Array.isArray(foundBooking.productID)) {
        console.log("Product IDs are an array:", foundBooking.productID);

        try {
          const productPromises = foundBooking.productID.map(
            async (productId) => {
              const response = await fetch(
                `/api/products/${productId}`
              );

              if (!response.ok) {
                throw new Error(
                  `Failed to fetch product data for ID: ${productId}`
                );
              }

              const product = await response.json();
              return product;
            }
          );

          const products = await Promise.all(productPromises);
          console.log("Products:", products);
          setProductData(products);
        } catch (error) {
          console.error("Failed to fetch product data:", error);
        }
      } else {
        console.log("Product ID:", foundBooking.productID);

        try {
          const response = await fetch(
            `/api/products/${foundBooking.productID}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch product data");
          }

          const product = await response.json();
          console.log("Product:", product);
          setProductData([product]);
        } catch (error) {
          console.error("Failed to fetch product data:", error);
        }
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
    <form onSubmit={handleSearch} className="form-search">
      <div className="search-id">
        <input
          type="text"
          placeholder="Search by booking ID"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={clearSearchTerm}
          className="search-input"
        />
        <Button
          variant="outlined"
          sx={{
            color: "white",
            backgroundColor: "rgb(186, 148, 222)",
            padding: "8px",
            width: "150px",
            border: "solid grey 1px",
            "&:hover": {
              backgroundColor: "white",
              border: "solid grey 1px",
              color: "black",
            },
          }}
          type="submit"
        >
          Search
        </Button>
      </div>
      <p className="error-message">{error}</p>
      {matchedBooking ? (
  <div className="bookings-container">
    <h2>Order details for ID: {matchedBooking._id.slice(-4)}</h2>
    <table>
      <thead>
        <tr>
          <th>Product Image</th>
          <th>Product Name</th>
          <th>Product Duration</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {productData &&
          productData.map((product) => {
            const startDate = moment(matchedBooking.startDate);
            const endDate = moment(matchedBooking.endDate);
            const duration = endDate.diff(startDate, 'days');

            return (
              <tr key={product._id}>
                <td>
                  <div>
                    <Link to={`/product/${product._id}`}>
                      <img src={product.image} alt="" />
                    </Link>
                  </div>
                </td>
                <td>{product.name}</td>
                <td>{duration} days</td> {/* Display the duration */}
                <td>{product.price}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  </div>
) : (
  <p></p>
)}
    </form>
  );
};

export default SearchOrder;



{/* <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Product Name</th>
            <th>Price per Day</th>
            <th>Number of Days</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map((order, index) => (
            <tr key={index}>
              <td>{order.orderDate}</td>
              <td>{order.productName}</td>
              <td>${order.price}</td>
              <td>{order.numberOfDays}</td>
              <td>${order.price}</td>
            </tr>
          ))}
        </tbody>
      </table> */}