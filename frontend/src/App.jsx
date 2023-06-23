import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/navbar';
import SearchBar from "./components/searchBar";

import Home from "./pages/Home";
import Cradles from "./pages/Cradles";
import ProductPage from "./pages/ProductPage";
import SearchOrder from "./pages/SearchOrder";

import Bookings from "./pages/Bookings";
import CheckoutForm from "./pages/CheckoutForm";
import BookingConfirmed from './pages/BookingConfirmed';



const stripePromise = loadStripe('pk_test_51NDvUjGKWFRid3mJJjmf8swecnx2d7GX5ZChChQxEVya17DKHWNiboehU7lSllQuf1dkwIwf8gCUJCXuJDYoqiNv00uYCtWsjT');
const App = () => {

  const [myBookings, setMyBookings] = useState([]);
  const [displayCheckout, setCheckout] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});//new state for the booking details
  const [message, setMessage] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);//new state for the order history
  const [orderProduct, setOrderProduct] = useState({});//new state for the order history

  const handleBookings = function(cradle) {
    // check if cardle already in the list
    // then increment quantity other set quantity to 1
    const booking = myBookings.filter(booking => booking._id === cradle._id);

    if (booking.length > 0) {
      const updatedBookings = myBookings.map((data) =>
        data._id === cradle._id ? { ...data, quantity: data.quantity + 1 } : data
      );
      setMyBookings(updatedBookings);
    } else {
      cradle.quantity = 1;
      setMyBookings(prevBookings => [...prevBookings, cradle]);
    }
  };


  const removeBooking = function(id) {
    setMyBookings(myBookings.filter(booking => { return booking._id !== id; }));
  };

  const handleCheckout = function (state) {
    setCheckout(state);
  };

  const handleBookingDetails = function (details) {
    setBookingDetails(details);
  };

  const handleOrderHistory = function (history) {
    setOrderHistory(history);
  };

  const handleOrderProduct = function (product) {
    setOrderProduct(product);
  }; 

  return (

    <Elements stripe={stripePromise} >
      <div>
      <ToastContainer />
        <Navbar myBookings={myBookings} />
        <Routes>
          <Route path="/" element={<Home SearchBar={SearchBar} />} />
          <Route path="cradles" element={<Cradles handleBookings={handleBookings} />} />
          <Route path="product/:id" element={<ProductPage />} /> {/* New route for the product page */}
          <Route path="bookings" element={<Bookings myBookings={myBookings} removeBooking={removeBooking} handleCheckout={handleCheckout} setMessage={setMessage} />} />
          <Route path="booking/confirmed" element={<BookingConfirmed myBookings={myBookings} message={message} setMessage={setMessage} orderProduct={orderProduct} />} /> {/* route for the confirmed bookings page */}
          <Route path="/search" element={<SearchOrder/>} />
        </Routes>
      </div>
      {displayCheckout && <CheckoutForm handleCheckout={handleCheckout} message={message} setMessage={setMessage} myBookings={myBookings} handleOrderHistory={handleOrderHistory} handleOrderProduct={handleOrderProduct} setMyBookings={setMyBookings} />}

    </Elements>
  );
};

export default App;