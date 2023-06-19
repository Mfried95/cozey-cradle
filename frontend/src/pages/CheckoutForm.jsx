
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import '../styles/checkoutForm.css';
import axios from 'axios';
import moment from 'moment';

const CheckoutForm = (props) => {
  const { myBookings, setMessage, handleOrderProduct, handleCheckout, setMyBookings } = props;
  console.log(myBookings)

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
      // console.log("success");
      const bookings = [];
      const quantities = [];
      myBookings.forEach((booking) => {
        bookings.push(booking._id);
        quantities.push(booking.quantity);
      });
      try {
        console.log("bookings", myBookings);
        const response = await axios.post("http://localhost:3000/bookings", {
          productID: bookings,
          productQuantities: quantities,
          status: true,
          startDate: startDate,
          endDate: endDate
        });
        console.log(response);
        if (response.data.success) {
          console.log("Successful Payment");
          handleOrderProduct(
            // productImage: myBookings[0].image,
            // productQuantities: quantities,
            // orderDate: moment().format('YYYY-MM-DD'),
            // productName: myBookings.name,
            // price: myBookings.price,
            // numberOfDays: moment(endDate).diff(moment(startDate), 'days'),
            // totalPrice: myBookings[0].price * moment(endDate).diff(moment(startDate), 'days')
            response.data.data
          );
          // handleOrderHistory(response.data.data.allOrders);
          console.log("response.data.allOrders", response.data.message);
          console.log("response.data", response.data);
          setMyBookings([]);
          setMessage('the booking was confirmed');
          // localStorage.removeItem('startDate');
          // localStorage.removeItem('endDate');
          handleCheckout(false);
          navigate('/booking/confirmed');
          // window.location.href='/booking/confirmed';
        }
       else {
          console.log("Error", response.data.error);
          setMessage('the booking is invalid');
        }
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