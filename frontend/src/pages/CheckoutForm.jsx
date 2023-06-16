
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import '../styles/checkoutForm.css';
import axios from 'axios';

const CheckoutForm = (props) => {
  const { handleCheckout, myBookings, setMessage } = props;


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
      console.log(myBookings);
      try {
        const response = await axios.post("http://localhost:3000/api/bookings", {
          myBookings: myBookings
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
            <button type="submit" disabled={!stripe} onClick={() => handleCheckout('false')}>
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;