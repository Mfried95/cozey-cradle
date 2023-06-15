import { Link } from "react-router-dom";
import '../styles/bookings.css';

const Bookings = (props) => {
  const { myBookings, handleCheckout } = props;


  // Calculate the total cost of all products
  const totalCost = myBookings.reduce((acc, booking) => acc + booking.price, 0);

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
                <img src={booking.image} alt={booking.name} style={{ width: '100px' }} />
              </td>
              <td>${booking.price}</td>
              <td>{/* Number of days input field */}1</td>
              <td>${booking.price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr >
            <td colSpan="3">Total Cost of All Products:</td>
            <td>${totalCost}</td>
          </tr>
        </tfoot>
      </table>

      <div className="button-container">
        <button className="checkout-button" onClick={() => handleCheckout('true')}>Checkout</button>
        <Link to="/Cradles" className="cradles-button">Back to Cradles</Link>
      </div>

    </div>

  );

};

export default Bookings;