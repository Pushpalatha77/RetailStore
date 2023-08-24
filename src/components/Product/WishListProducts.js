import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const WishListProducts = () => {
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [isAlreadyInWishlist, setIsAlreadyInWishlist] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:2000/wishlist-products")
            .then((response) => {
                setWishlistProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching wishlist products:', error);
                alert('Error fetching wishlist products. Please try again later.');
            });

    }, []);

    const handleAddToWishlist = (product) => {
        if (wishlistProducts.some(p => p.id === product.id)) {
            // Product already in wishlist, set isAlreadyInWishlist state to true
            setIsAlreadyInWishlist(true);
        } else {
            setIsAlreadyInWishlist(false);
            setWishlistProducts([...wishlistProducts, product]);
        }
    };

    return (
        <div>
            <Navbar />
            <MDBContainer className="my-5">

                <h2 >Wishlist Products List</h2>
                {isAlreadyInWishlist && (
                    <div className="alert alert-warning">
                        Product is already in the wishlist.
                    </div>
                )}
                <MDBTable striped borderless>
                    <MDBTableHead className="text-white" style={{ backgroundColor: '#9DC08B' }}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Unique ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">ProductType</th>

                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {wishlistProducts.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.productType}</td>

                            </tr>
                        ))}
                    </MDBTableBody>
                </MDBTable>

            </MDBContainer>
            <Footer />
        </div>
    );
};

export default WishListProducts;
