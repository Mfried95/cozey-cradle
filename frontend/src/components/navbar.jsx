import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { myBookings } = props;
  return (
    <nav className="nav-container">
      
      <h2>Cozey Cradle</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/Cradles">Cradles</Link>
        <Link to="/bookings"> My Bookings
          {myBookings.length > 0 && myBookings.length}
        </Link>
        <Link to="/search">Search Order</Link>
      </div>
    </nav>
  );
};

export default Navbar;
