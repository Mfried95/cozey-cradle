import "../styles/navbar.css";

const navbar = () => {
  return (
    <div className="nav-container">
      <h2>Cozey Cradle</h2>
      <div className="nav-links">
        <a href="/">How it works</a>
        <a href="/">Cradles</a>
      </div>
    </div>
  );
};

export default navbar;
