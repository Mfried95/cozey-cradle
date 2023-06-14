
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import '../styles/checkoutForm.css';

const CheckoutForm = (props) => {
  const { handleCheckout } = props;
  
  const { setMessage } = props; 


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
      navigate('/booking/confirmed');
      setMessage('the booking was confirmed')
      window.location.reload();
    } else {
      setMessage('Invalid payment');
      console.log(error.message);
      setMessage('the bookingis invalid')
    }

  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div>
          <form onSubmit={handleSubmit}>
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