import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ProductContext } from '../../context/ProductContext';

export const EditProduct = () => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productType, setProductType] = useState('');
  const [productTypes, setProductTypes] = useState([]);
  const products = useContext(ProductContext);

  useEffect(() => {
    axios.get("http://localhost:2000/productstype")
      .then((response) => {
        setProductTypes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product types:', error);
      });
  }, []);

  const handleEdit = () => {
    if (!productId) {
      alert('Please enter a product ID to edit.');
      return;
    }

    if (!productName || !productPrice || !productType) {
      alert('Please enter product name, price, and type.');
      return;
    }

    const updatedProduct = {
      name: productName,
      price: productPrice,
      productType: productType,
    };

    axios
      .put(`http://localhost:2000/products/${productId}`, updatedProduct)
      .then((response) => {
        console.log(`Product with ID ${productId} updated successfully.`);
        // You might want to update the products context here.
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert(`No product found with ID ${productId}.`);
        } else {
          console.error('Error updating product:', error);
        }
      });

    // Clear the input fields after editing.
    setProductId('');
    setProductName('');
    setProductPrice('');
    setProductType('');
  };

  return (
    <div className="edit-product-container" style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ marginBottom: '10px', color: '#333' }}>Edit Product</h2>
    
      <label>Product ID</label>
      <input
        type="number"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <label>Product Name</label>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <label>Product Price</label>
      <input
        type="number"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />
      <label>Product Type</label>
      <select
        value={productType}
        onChange={(e) => setProductType(e.target.value)}
      >
        <option value="">Select Product Type</option>
        {productTypes.map(type => (
          <option key={type.id} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleEdit}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '15px'
        }}
      >
        Edit Product
      </button>
    </div>
  );
};
