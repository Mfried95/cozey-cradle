import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/productpage.css'

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
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
        <div className="product-detail-image"><img src={product.image} alt="" /></div>
        <div className='product-detail-info'>
          <h2>Product Details</h2>
          <h3>{product.brand}</h3>
          <span>Available in {product.city}</span>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
          <button className='product-detail-button' onClick={() => navigate("/cradles")}>Go Back To The Other Cradles</button>
        </div>
        {/* Display other product information */}
      </div>
    </div>
  );
}

export default ProductPage;