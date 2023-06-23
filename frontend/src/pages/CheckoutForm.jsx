
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import '../styles/checkoutForm.css';
import axios from 'axios';
import moment from 'moment';

const CheckoutForm = (props) => {
  const { myBookings, setMessage, handleOrderProduct, handleCheckout, setMyBookings } = props;

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  let startDate = moment(localStorage.getItem('startDate')).format('YYYY-MM-DD');
  let endDate = moment(localStorage.getItem('endDate')).format('YYYY-MM-DD');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (paymentMethod) {
      const bookings = [];
      const quantities = [];
      myBookings.forEach((booking) => {
        bookings.push(booking._id);
        quantities.push(booking.quantity);
      });
      try {
        const response = await axios.post("/bookings", {
          productID: bookings,
          productQuantities: quantities,
          status: true,
          startDate: startDate,
          endDate: endDate
        });
        if (response.data.success) {
          handleOrderProduct(
            response.data.data
          );
          setMyBookings([]);
          setMessage('the booking was confirmed');
          handleCheckout(false);
          navigate('/booking/confirmed');
        }
       else {
          setMessage('the booking is invalid');
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      setMessage('Invalid payment');
      setMessage('the booking is invalid');
    }

  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div>
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="card-details">
              <label>
                Card Details
                <CardElement />
              </label>
            </div>
            <button type="submit" disabled={!stripe}>
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;