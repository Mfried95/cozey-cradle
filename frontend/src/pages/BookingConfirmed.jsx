import React from "react";
import { Link } from "react-router-dom";

const BookingConfirmed = (props) => {
  const { orderProduct } = props;
  console.log(orderProduct);

  // const orderHistory = orderProduct.map((product) => {
  //   return {
  //     orderDate: new Date().toLocaleDateString(),
  //     productName: product.name,
  //     price: product.price,
  //     numberOfDays: product.numberOfDays,
  //     totalPrice: product.totalPrice,
  //   };
  // });

  return (
    <div className="confirmation-container">
      <h1>Order Confirmation</h1>

      <h2>Booking Details</h2>
      <h2>Order ID {orderProduct.bookingID}</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Name </th>
            <th>Price per Day</th>
            <th>Number of Days</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orderProduct.productResult.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.productID}</td>
                <td>
                  <img src={product.productImage} alt={product.productName} style={{ width: '100px' }} />
                </td>
                <td>{product.quantity}</td>
                <td>{product.productName}</td>
                <td>${product.productPrice}</td>
                <td>{product.numberOfDays}</td>
                <td>${product.totalPrice}</td>
                </tr>
            )
          })
          }
        </tbody>
      </table>


      <div className="button-container">
        <Link to="/cradles" className="bookings-button">Back to Other Cradles for Rent!</Link>
      </div>
    </div>
  );
};

export default BookingConfirmed;