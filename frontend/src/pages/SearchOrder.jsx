import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SearchOrder = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedBooking, setMatchedBooking] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/bookings")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) =>
        console.error("Failed to fetch bookings:", error)
      );
  }, []);

  const handleSearch = () => {
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
    } else {
      setMatchedBooking(null);
      setError("No match found");
    }

    setSearchTerm("");
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setError('')
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <TextField
        label="Search by booking ID"
        variant="outlined"
        value={searchTerm}
        onChange={handleInputChange}
        onClick={clearSearchTerm}
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
        <p>{error}</p>
      )}
    </div>
  );
};

export default SearchOrder;
