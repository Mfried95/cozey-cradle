import { Link } from "react-router-dom";
import moment from 'moment';
import { useEffect } from 'react';
import '../styles/bookings.css';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Bookings = (props) => {
  const { myBookings, handleCheckout, handleOrderProduct, removeBooking  } = props;
  // const totalCost = myBookings.reduce((acc, booking) => acc + booking.price * numberOfDays, 0);

  // Calculate the number of days between start date and end date
  let startDate = moment(localStorage.getItem('startDate')).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD');
  let endDate = moment(localStorage.getItem('endDate')).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD');

  // const numberOfDays = differenceInDays(endDate, startDate);
  const numberOfDays = moment(endDate).diff(moment(startDate), 'days');
  console.log("startDate", startDate, "endDate", endDate);

  // Calculate the total cost of all products
  const totalCost = myBookings?.reduce((acc, booking) => acc + (booking.price * numberOfDays * booking.quantity), 0);


  useEffect(() => {
    function onKeyup(e) {
      if (e.key === 'Escape') { console.log('escape'); handleCheckout(false); }
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, []);


const product = myBookings.map((booking, index) => {
  return {
    image: booking.image,
    name: booking.name,
    price: booking.price,
    numberOfDays: numberOfDays,
    totalPrice: booking.price * numberOfDays
  }
});

  return (
    <div className="bookings-container">
      <h1>My Bookings</h1>

      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Price per Day</th>
            <th>Number of Days</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {myBookings.map((booking, index) => (
            <tr key={index}>
              <td>
                <Link to={`/product/${booking._id}`}>
                  <div className="image-container">
                    <img src={booking.image} alt={booking.name} style={{ width: '100px' }} />
                  </div>
                </Link>
                <IconButton aria-label="delete" onClick={() => removeBooking(booking._id)}>
                  <DeleteIcon />
                </IconButton>
              </td>
              <td>{booking.quantity}</td>
              <td>${booking.price}</td>
              <td>{numberOfDays}</td>
              <td>${booking.price * numberOfDays * booking.quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total Cost of All Products:</td>
            <td>${totalCost}</td>
          </tr>
        </tfoot>
      </table>

      <div className="button-container">
        <Button variant="outlined" className="checkout-button" onClick={() => handleCheckout('true')} disabled={myBookings.length === 0}>Checkout</Button>
        <Link to="/Cradles" ><Button variant="outlined">Back to Cradles</Button></Link>
      </div>

    </div>
  );
};

export default Bookings;