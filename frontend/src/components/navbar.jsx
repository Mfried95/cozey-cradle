import "../styles/navbar.css";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Navbar = (props) => {
  const { myBookings } = props;
  return (
    <nav className="nav-container">
      
      <h2>Cozey Cradle</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/Cradles">Cradles</Link>
        <Link to="/bookings"> My Bookings
          {myBookings.length > 0 && myBookings?.reduce((acc, booking) => acc + booking.quantity, 0)}
        </Link> */}
        <Link to="/bookings">
          <div className="cart">
            {myBookings.length > 0 && <span className="count">{myBookings.length > 0 && myBookings?.reduce((acc, booking) => acc + booking.quantity, 0)}</span>}
            <i className="material-icons"><AddShoppingCartIcon /></i>
          </div>

        </Link>
        <Link to="/search">Search Order</Link>
      </div>
    </nav>
  );
};

export default Navbar;
