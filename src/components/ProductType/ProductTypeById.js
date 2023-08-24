import React, { useContext, useState } from 'react';
import { Form } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ProductTypeContext } from '../../context/ProductTypeContext';
import './ProductTypeById.css';

export const ProductTypeById = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const productstype = useContext(ProductTypeContext);
  const [productTypeDetails, setProductTypeDetails] = useState(null);
  const [recordNotFound, setRecordNotFound] = useState(false); // New state for record not found
  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.get(`http://localhost:2000/productstype/${data.id}`);
      if (response.data) {
        setProductTypeDetails(response.data);
        setRecordNotFound(false); // Clear the record not found state
      } else {
        setProductTypeDetails(null);
        setRecordNotFound(true); // Set record not found state
      }
    } catch (error) {
      console.error(error);
      setProductTypeDetails(null);
      setRecordNotFound(true); // Set record not found state
    }
  }

  return (
    <div className='product-type-by-id-container'>
      <form className='product-type-by-id-form'onSubmit={handleSubmit(handleFormSubmit)}>
        <label>Product Type ID</label>
        <input type="number" id="id" {...register('id', { required: true })} />
        {errors.id && errors.id.type === "required" && <span>ID is required</span>}

        <br /><br />
        <input type="submit" value="Get Product Type Details" />
      </form>

      {recordNotFound && (
        <p>No record found with the provided ID.</p>
      )}

      {productTypeDetails && !recordNotFound && (
        <div>
          <h2>Product Type Details</h2>
          <p>ID: {productTypeDetails.id}</p>
          <p>Name: {productTypeDetails.name}</p>
          {/* Display other details as needed */}
        </div>
      )}
    </div>
  )
}