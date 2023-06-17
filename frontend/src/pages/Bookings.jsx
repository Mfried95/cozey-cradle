import { Link } from "react-router-dom";
import moment from 'moment';
import '../styles/bookings.css';

const Bookings = (props) => {
  const { myBookings, handleCheckout, handleOrderProduct } = props;
  // const totalCost = myBookings.reduce((acc, booking) => acc + booking.price * numberOfDays, 0);

  // Calculate the number of days between start date and end date
  let startDate = moment(localStorage.getItem('startDate')).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD');
  let endDate = moment(localStorage.getItem('endDate')).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD');

  // const numberOfDays = differenceInDays(endDate, startDate);
  const numberOfDays = moment(endDate).diff(moment(startDate), 'days') || 1;

  // Calculate the total cost of all products
  const totalCost = myBookings?.reduce((acc, booking) => acc + (booking.price * numberOfDays), 0);

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
                  <img src={booking.image} alt={booking.name} style={{ width: '100px' }} />
                </Link>
              </td>
              <td>${booking.price}</td>
              <td>{numberOfDays}</td>
              <td>${booking.price * numberOfDays}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total Cost of All Products:</td>
            <td>${totalCost}</td>
          </tr>
        </tfoot>
      </table>

      <div className="button-container">
        <button className="checkout-button" onClick={() => {
          handleCheckout('true');
          handleOrderProduct(product);
        }}>Checkout</button>
        <Link to="/Cradles" className="cradles-button">Back to Cradles</Link>
      </div>

    </div>
  );
};

export default Bookings;