import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { myBookings } = props;
  return (
    <div className="nav-container">
      <h2>Cozey Cradle</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/Cradles">Cradles</Link>
        <Link to="/Works">How it works</Link>
        <Link to="/bookings"> My Bookings
          {myBookings.length > 0 && myBookings?.reduce((acc, booking) => acc + booking.quantity, 0)}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
