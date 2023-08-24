import React,{useContext} from 'react'
import { Form } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { ProductTypeContext } from '../../context/ProductTypeContext';
import './AddProductType.css';

export const AddProductType = () => {

    const { register, handleSubmit, formState:{errors}} = useForm();
    const productstype = useContext(ProductTypeContext);
    const handleFormSubmit=(data)=>{console.log(data);
   axios.post(" http://localhost:2000/productstype",data);
    }

  return (
    <div className='add-product-type-container'>
        <form className='add-product-type-form' onSubmit={handleSubmit(handleFormSubmit)}>
            <br></br>
            
            <label>Product Type Name</label>
            <input type="text" id='name' {...register('name',{required:true,minLength:3})}/>
            {errors.name && errors.name.type == "required" && <span>Id is required</span>}
            {errors.name && errors.name.type == "minLength" && <span>minimum 3 characters </span>}

            <br></br>
            <input type="submit" value="Add Product Type"></input>
        </form>
    </div>
  )
}