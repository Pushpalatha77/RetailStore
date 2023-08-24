import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../../context/ProductContext';
import {
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBIcon,
    MDBTypography,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from "mdb-react-ui-kit";
import axios from 'axios';
import '../assets/styles/ProductList.css'; // Import your CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export const ViewAllProducts = () => {
    const productsContext = useContext(ProductContext);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    const navigate = useNavigate();

    useEffect(() => {
       // Fetch the list of products from your API or context
        axios.get("http://localhost:2000/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []); // The empty dependency array ensures this effect runs only once when the component mounts

    return (
        <div>
            <h2>Product List</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>ProductType</th>
                        <th>Id</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="product-row">
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.productType}</td>
                            <td>{product.id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br /><br />
        </div >
    );
};