import { Route, Routes } from "react-router-dom";
import React, { useState } from 'react';
import Navbar from './components/navbar';
import Home from "./pages/Home";

import Cradles from "./pages/Cradles";
import Works from "./pages/Works";
import ProductPage from "./pages/ProductPage";
import Bookings from "./pages/Bookings";


const App = () => {

  const [myBookings, setMyBookings] = useState([]);

  const handleBookings = function(cradle) {
    setMyBookings(prevBookings => [...prevBookings, cradle]);
    //console.log("length here", myBookings.length);
  };

  return (
    <div>
      <Navbar myBookings={myBookings} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cradles" element={<Cradles handleBookings={handleBookings} />} />
        <Route path="works" element={<Works />} />
        <Route path="product/:id" element={<ProductPage />} /> {/* New route for the product page */}
        <Route path="bookings" element={<Bookings myBookings={myBookings} />} />
      </Routes>
    </div>
  );
};

export default App;