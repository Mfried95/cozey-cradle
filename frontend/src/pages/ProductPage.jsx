import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => console.error('Failed to fetch product:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Product Details</h2>
      <img src={product.image} alt="" />
      <h3>{product.brand}</h3>
      <p>Price: ${product.price}</p>
      {/* Display other product information */}
    </div>
  );
}

export default ProductPage;