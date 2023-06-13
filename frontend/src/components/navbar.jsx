import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-container">
      <h2>Cozey Cradle</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cradles">Cradles</Link>
        <Link to="/works">How it works</Link>
      </div>
    </div>
  );
};

export default Navbar;
