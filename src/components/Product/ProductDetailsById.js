import React, { useContext, useState } from 'react';

import axios from 'axios';

import { ProductContext } from '../../context/ProductContext';

import './ProductDetailsById.css';

export const ProductDetails = () => {
  const products = useContext(ProductContext);
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fetchProductDetails = () => {

    setErrorMessage(''); // Clear any previous error messages

    if (!productId) {

      setErrorMessage('Please enter a valid Product ID.');

      return;
    }
    // Fetch the specific product details based on the productId

    axios.get(`http://localhost:2000/products/${productId}`)

      .then(response => {

        if (response.data) {

          setProduct(response.data);

        } else {

          setErrorMessage('No records found for this Product ID.');

        }

      })

      .catch(error => {

        console.error('Error fetching product details:', error);

        setErrorMessage('Error fetching product details. Please try again later.');

      });

  };
  const handleProductIdChange = event => {

    setProductId(event.target.value);

  };
  return (

    <div className="product-details-container">

      <h2>Product Details</h2>

      <label htmlFor="productId">Enter Product ID: </label>

      <input type="text" id="productId" value={productId} onChange={handleProductIdChange} />

      <button onClick={fetchProductDetails}>Fetch Product Details</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {product && (

        <div>

          <p><strong>Name:</strong> {product.name}</p>

          <p><strong>Price:</strong> {product.price}</p>

          <p><strong>Product Type:</strong> {product.productType}</p>
        </div>

      )}

    </div>

  );

}