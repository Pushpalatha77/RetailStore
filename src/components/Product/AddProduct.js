import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ProductContext } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';
export const AddProduct = () => {
  const [count,setCount]=useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const products = useContext(ProductContext);
  const [productTypes, setProductTypes] = useState([]);
  const navigate= useNavigate();
  const increment=()=>setCount(count+1);

  useEffect(() => {
    axios.get("http://localhost:2000/productstype")
      .then((response) => {
        setProductTypes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product types:', error);
      });
  }, []);

  const handleFormSubmit = (data) => {
    console.log(data);
    axios.post('http://localhost:2000/products', data)
      .then(response => {
        // Handle success, e.g., redirect to another page
         navigate('/viewproducts');
      })
      .catch(error => {
        console.error('Error adding product: ', error);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <br />
        <label>Product Name</label>
        <input type="text" id='name' {...register('name', { required: true, minLength: 3 })} />
        {errors.name && errors.name.type === 'required' && <span>Name is required</span>}
        {errors.name && errors.name.type === 'minLength' && <span>Minimum 3 characters</span>}
        <br /><br />
        <label>Product Price</label>
        <input type="number" id='price' {...register('price', { required: true })} />
        {errors.price && errors.price.type === 'required' && <span>Price is required</span>}
        <br /><br />
        <label>Product Type</label>
        <select id='productType' {...register('productType', { required: true })}>
          <option value="">Select Product Type</option>
          {productTypes.map(type => (
            <option key={type.id} value={type.productType}>
              {type.name}
            </option>
          ))}
        </select>
        {errors.productType && errors.productType.type === 'required' && (
          <span>Product Type is required</span>
        )}
        <br /><br />
        
        <input type="submit" value="Add Product" />
      </form>
      <div>the count value is {count}
      <button onClick={increment}>Increment</button></div>
      
    </div>
  );
}