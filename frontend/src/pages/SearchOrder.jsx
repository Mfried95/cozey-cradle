import { useState, useEffect } from "react";

const SearchOrder = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/bookings')
      .then(response => response.json())
      .then(data => {
        setBookings(data);
      })
      .catch(error => console.error('Failed to fetch bookings:', error));
  }, []);

  console.log(bookings); // Log bookings directly in the render phase

  const shortenId = (id) => {
    return id.substring(0, 4); // Extract the first 4 characters of the id
  };

  return (
    <div>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>{shortenId(booking._id)}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchOrder;