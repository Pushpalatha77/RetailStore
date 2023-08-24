import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ProductTypeContext } from '../../context/ProductTypeContext';
import './ProductTypeList.css';

export const ProductTypeList = () => {
  const productstypeContext = useContext(ProductTypeContext);
  const [productstype, setProductsType] = useState([]);

  useEffect(() => {
    // Fetch the list of products from your API or context
    axios.get("http://localhost:2000/productstype")
      .then((response) => {
        setProductsType(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="product-type-list">
      <h2>Product Type List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {productstype.map(producttype => (
            <tr key={producttype.id}>
              <td>{producttype.name}</td>
              <td>{producttype.id}</td>
              {/*<td><Link to={`editProduct/${product.id}`}> Edit </Link></td>*/}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
