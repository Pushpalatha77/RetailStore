import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ProductTypeContext } from '../../context/ProductTypeContext';
import './DeleteProductType.css'; // Import the CSS file

export const DeleteProductType = () => {
    const [producttypeId, setProductTypeId] = useState('');
    const productstype = useContext(ProductTypeContext);
    const handleDelete = () => {
        if (!producttypeId) {
            alert('Please enter a Product Type ID to delete.');
            return;
        }

        axios.delete(`http://localhost:2000/productstype/${producttypeId}`)
            .then((response) => {
                if (response.status === 200) {
                    // Handle success, e.g., remove the deleted product from the context or update the product list.
                    console.log(`Product with ID ${producttypeId} deleted successfully.`);
                    // You might want to update the products context here.
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    // Handle "not found" error and show an alert.
                    alert(`Product with ID ${producttypeId} not found.`);
                } else {
                    // Handle other errors, e.g., show an error message.
                    console.error('Error deleting product:', error);
                }
            });
        // Clear the input field after deletion.
        setProductTypeId('');
    };

    return (
        <div className="delete-product-type-container">
            <h2>Delete ProductType</h2>
            <label>Product Type ID</label>
            <input
                type="number"
                value={producttypeId}
                onChange={(e) => setProductTypeId(e.target.value)}
            />
            <button onClick={handleDelete}>Delete Product Type</button>
        </div>
    );
};



