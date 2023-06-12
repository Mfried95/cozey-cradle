import { useEffect, useState } from 'react';
import "../styles/cradle.css"

function Cradles() {
  const [cradles, setCradles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => {
        setCradles(data);
      })
      .catch(error => console.error('Failed to fetch products:', error));
  }, []);

  return (
    <div className="App">
      <h2>Our cradles</h2>
      <div>
        {cradles.map(cradle => (
          <div key={cradle._id} className="product-card">
            <img src={cradle.image} alt="" />
            <h3>{cradle.brand} :: {cradle.city}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cradles;