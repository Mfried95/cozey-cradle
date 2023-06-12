import { useEffect, useState } from 'react';


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
      
    </div>
  );
}

export default Cradles;