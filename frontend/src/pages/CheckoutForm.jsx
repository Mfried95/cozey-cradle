
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import '../styles/checkoutForm.css';
import axios from 'axios';

const CheckoutForm = (props) => {
  const { myBookings, setMessage } = props;


  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

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
      console.log("success");
      const bookings = [];
      myBookings.forEach((booking) => {
        console.log(booking._id);
        bookings.push(booking._id);
      });
      try {
        const response = await axios.post("http://localhost:3000/bookings", {
          productID: bookings,
          status: true,
          startDate: "2023-06-15",
          endDate: "2023-06-20"
        });
        if (response.data.success) {
          console.log("Successful Payment");
        }
        navigate('/booking/confirmed');
        setMessage('the booking was confirmed');
        window.location.reload();
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      setMessage('Invalid payment');
      console.log(error.message);
      setMessage('the bookingis invalid');
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