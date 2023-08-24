import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ProductTypeContext } from '../../context/ProductTypeContext';
import './EditProductType.css'; // Import the CSS file

export const EditProductType = () => {
  const [producttypeId, setProductTypeId] = useState('');
  const [newProductTypeName, setNewProductTypeName] = useState('');
  const productstype = useContext(ProductTypeContext);

  useEffect(() => {
    // You might want to fetch the existing product type details using the producttypeId
    // and populate the newProductTypeName input field with the existing name.
  }, [producttypeId]);

  const handleEdit = () => {
    if (!producttypeId || !newProductTypeName) {
      alert('Please enter Product Type ID and new name to edit.');
      return;
    }

    axios
      .put(`http://localhost:2000/productstype/${producttypeId}`, {
        name: newProductTypeName,
      })
      .then((response) => {
        if (response.status === 200) {
          // Handle success, e.g., update the edited product in the context or update the product list.
          console.log(`Product with ID ${producttypeId} edited successfully.`);
          // You might want to update the products context here.
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle "not found" error and show an alert.
          alert(`Product with ID ${producttypeId} not found.`);
        } else {
          // Handle other errors, e.g., show an error message.
          console.error('Error editing product:', error);
        }
      });

    // Clear the input fields after editing.
    setProductTypeId('');
    setNewProductTypeName('');
  };

  return (
    <div className="edit-product-type-container">
      <h2>Edit ProductType</h2>
      <label>Product Type ID</label>
      <input
        type="number"
        value={producttypeId}
        onChange={(e) => setProductTypeId(e.target.value)}
      />
      <label>New Product Type Name</label>
      <input
        type="text"
        value={newProductTypeName}
        onChange={(e) => setNewProductTypeName(e.target.value)}
      />
      <button onClick={handleEdit}>Edit Product Type</button>
    </div>
  );
};
