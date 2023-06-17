import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SearchOrder = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedBooking, setMatchedBooking] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/bookings")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => console.error("Failed to fetch bookings:", error));
  }, []);

  const handleSearch = () => {
    if (searchTerm.length !== 5) {
      console.log("Must enter in 5 digit booking id");
      return;
    }

    const foundBooking = bookings.find((booking) =>
      booking._id.endsWith(searchTerm)
    );
    setMatchedBooking(foundBooking);
    setSearchTerm("");
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <TextField
        label="Search by Last 4 Digits of Booking ID"
        variant="outlined"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      {matchedBooking ? (
        <ul>
          <li key={matchedBooking._id}>{matchedBooking._id}</li>
          {console.log(matchedBooking)}
        </ul>
      ) : (
        <p>No matching booking found.</p>
      )}
    </div>
  );
};

export default SearchOrder;
