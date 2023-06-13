import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/productpage.css'

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
    <div className='product-page-container'>
      <div className="product-details">
      <h2>Product Details</h2>
      {console.log(product)}
      <img src={product.image} alt="" />
      <h3>{product.brand}</h3>
      <span>Avalible in {product.city}</span>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      {/* Display other product information */}
      </div>
    </div>
  );
}

export default ProductPage;