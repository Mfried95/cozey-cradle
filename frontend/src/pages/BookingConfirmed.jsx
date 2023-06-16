import React from "react";
import { Link } from "react-router-dom";

const BookingConfirmed = (props) => {
  const { orderProduct } = props;
  console.log(orderProduct);

  const orderHistory = orderProduct.map((product) => {
    return {
      orderDate: new Date().toLocaleDateString(),
      productName: product.name,
      price: product.price,
      numberOfDays: product.numberOfDays,
      totalPrice: product.totalPrice,
    };
  });

  return (
    <div className="confirmation-container">
      <h1>Order Confirmation</h1>

      <h2>Booking Details</h2>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Price per Day</th>
            <th>Number of Days</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orderProduct.map((product, index) => {
            return (
              <tr key={index}>
                <td>
                  <img src={product.image} alt={product.name} style={{ width: '100px' }} />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.numberOfDays}</td>
                <td>${product.totalPrice}</td>
                </tr>
            )
          })
          }
        </tbody>
      </table>

      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Product Name</th>
            <th>Price per Day</th>
            <th>Number of Days</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map((order, index) => (
            <tr key={index}>
              <td>{order.orderDate}</td>
              <td>{order.productName}</td>
              <td>${order.price}</td>
              <td>{order.numberOfDays}</td>
              <td>${order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-container">
        <Link to="/cradles" className="bookings-button">Back to Other Cradles for Rent!</Link>
      </div>
    </div>
  );
};

export default BookingConfirmed;