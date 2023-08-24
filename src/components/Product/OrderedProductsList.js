import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const OrderedProductsList = () => {
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    // Fetch the ordered products list from the API
    axios.get("http://localhost:2000/orderedProducts")
      .then((response) => {
        setOrderedProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching ordered products:', error);
      });
  }, []);

  return (
    <div>
      <Navbar/>
    <MDBContainer className="my-5">
     
    {orderedProducts.map((order, index) => (
      <React.Fragment key={order.id}>
        <h2>Ordered Products List (Order #{index + 1})</h2>
        <MDBTable striped borderless>
          <MDBTableHead className="text-white" style={{ backgroundColor: '#9DC08B' }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Unique ID</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">ProductType</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {order.cart.map((product, productIndex) => (
              <tr key={`${order.id}-${productIndex}`}>
                <td>{productIndex + 1}</td>
                <td>{order.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.productType}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
        <br/><br/>
      </React.Fragment>
    ))}
  </MDBContainer>
  <Footer/>
  </div>
);
};

export default OrderedProductsList;
