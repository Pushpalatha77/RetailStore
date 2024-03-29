import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../../context/ProductContext';
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBRipple, MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from 'axios';
import '../assets/styles/ProductList.css'; // Import your CSS file for styling
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import TV from "../assets/images/tv.jpg";
import jeans from "../assets/images/jeans.jpg"
import TAB from "../assets/images/tab.jpg"

export const ProductList = () => {
  const productsContext = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  // const productImages = {
  //  TV:TV,
  //  Tab:TAB,
  //  Jeans:jeans,
  //  Laptop:laptop,
  // };
  
 
   // const img = prod.image.replace(/\s+/g, "");
    //const prodImg = productImages[img];
    const defaultImg =
      "https://www.wellplannedjourney.com/wp-content/uploads/Best-Outdoor-Products-Amazon.jpg";
    
  const navigate = useNavigate();
  const addToCart = (product) => {
    if (orderPlaced) {

      // If an order is already placed, start a new cart with the current product
      setCart([{ ...product, quantity: 1 }]);
      setOrderPlaced(false); // Reset orderPlaced status
      setInvoiceGenerated(false); // Reset invoice generation status

    } else {



      const existingCartItem = cart.find(item => item.id === product.id);


      if (existingCartItem) {



        const updatedCart = cart.map(item =>



          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item



        );



        setCart(updatedCart);



      } else {



        setCart([...cart, { ...product, quantity: 1 }]);



      }



    }



  };

  const addToWishlist = (product) => {

    const existingWishlistItem = wishlist.find(item => item.id === product.id);



    if (existingWishlistItem) {

      // If the item is already in the wishlist, show an alert and return

      window.alert("Item is already present in the wishlist!");

      return;

    }



    // If the item is not in the wishlist, add it and make a POST request

    setWishlist([...wishlist, { ...product }]);

    axios.post("http://localhost:2000/wishlist-products", product)

      .then(response => {

        // Handle the success response if needed

        console.log("Product added to wishlist:", response.data);

        navigate("/wishlist");

      })

      .catch(error => {

        // Handle the error response if needed

        console.error("Failed to add product to wishlist:", error);

      });

  };
  const removeFromCart = (productId) => {

    const updatedCart = cart.map(item =>

      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item

    ).filter(item => item.quantity > 0);

    setCart(updatedCart);
  };
  function increaseQuantity(itemId) {

    setCart((prevCart) =>

      prevCart.map((item) =>

        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item

      )

    );

  }

  function decreaseQuantity(itemId) {

    setCart((prevCart) =>

      prevCart.map((item) =>

        item.id === itemId && item.quantity > 1

          ? { ...item, quantity: item.quantity - 1 }

          : item

      )

    );

  }

  const placeOrder = () => {
    axios.post(" http://localhost:2000/orderedProducts", { cart })
      .then(() => {
        setOrderPlaced(true);
        setInvoiceGenerated(false); // Reset invoice generation status
      })
       .catch((error) => {
        console.error('Error placing order:', error);
      });
  };

  const cancelOrder = () => {
    console.log('Cancel order button clicked');
    
    const cartIds = cart.map((cartItem) => cartItem.id);
  
    console.log('Canceling order with IDs:', cartIds);
  
    axios.delete(`http://localhost:2000/orderedProducts/${cartIds}`)

      .then(() => {

        console.log('Order canceled successfully');

        setOrderPlaced(false);

        setInvoiceGenerated(false);

        setCart([]);

      })
      .catch((error) => {
        console.error('Error canceling order:', error);
      });
  };
  const generateInvoice = () => {
    // Assuming you have an API endpoint that generates an invoice for the placed order
    axios.post("http://localhost:2000/generate-invoice",)
      .then((response) => {
        // Assuming the invoice data is returned in the response
        const invoiceData = response.data;
        // Implement your logic here to handle the invoice data
        console.log("Generated Invoice:", invoiceData);
        // Display the invoice details to the user
        if (invoiceData.products) {
          console.log("Invoice Details:");
          invoiceData.products.forEach((product) => {
            console.log(`Product: ${product.name}, Quantity: ${product.quantity}, Price: ${product.price}, ID: ${product.id}`);
          });
        }
        // Set invoiceGenerated to true
        setInvoiceGenerated(true);
      })
      .catch((error) => {
        console.error('Error generating invoice:', error);
      });
  };
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
      <Navbar />
      <h2>Product List</h2>
      <div className="row">     
      
          {products.map(product => (
            <div key={product.id} className="product-row">
            
          {/* Integrate MDBCard here */}
          <MDBCard style={{ backgroundColor: "#fcffeb" }} className="shadow-0 border rounded-3">
            <MDBCardBody>
              <MDBRow>
              <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
        <MDBRipple rippleColor="dark" rippleTag="div" className="bg-image rounded hover-zoom hover-overlay">
          <MDBCardImage src={product.image? product.image : defaultImg} fluid className="w-100" />
        </MDBRipple>
      </MDBCol>
                <MDBCol md="6">
                  <h5>{product.brand} {product.name}</h5>
                  <div className="d-flex flex-row">
							<span>9999</span>              
						</div>
            <h5>retailstore.com</h5>
                  <div className="mt-1 mb-0 text-muted small">
                    <span>{product.colour}</span>
                    <span className="text-primary"> • </span>
                    <span>{product.productType}</span>
                    <span className="text-primary"></span>
                    <span>{product.category}<br /></span>
                  </div>
                  <div className="mb-2 text-muted small">
                    <span>Unique design</span>
                    <span className="text-primary"> • </span>
                    <span>Best Quality</span>
                    <span className="text-primary"> • </span>
                    <span>Very Durable<br /></span>
                  </div>
                </MDBCol>
                <MDBCol md="6" lg="3" className="border-sm-start-none border-start">
                  <div className="d-flex flex-row align-items-center mb-1">
                    <h4 className="mb-1 me-1">₹{product.price}</h4>
                    <span className="text-danger">
                      <s>₹{(product.price * 1.1).toFixed(2)}</s>
                    </span>
                  </div>
                  <h6 className="text-success">Free shipping</h6>
                  <div className="d-flex flex-column mt-4">
                    <MDBBtn onClick={() => addToCart(product)} color="success" size="sm">Add to Cart</MDBBtn>
                    <MDBBtn onClick={() => addToWishlist(product)} outline color="success" size="sm" className="mt-2">Add to wish list</MDBBtn>
                  </div>
                </MDBCol>
                <br></br>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </div>
          ))}
         </div>
       
      <br /><br />
      <div className="card">

        <h5 className="card-header">Cart</h5>

        <ul className="list-group list-group-flush">

          {cart.map(cartItem => (

            <li key={cartItem.id} className="list-group-item d-flex justify-content-between align-items-center">

              {cartItem.name} - {cartItem.price} x {cartItem.quantity}

              <div>

                {/* Decrement button */}

                <button

                  className="btn btn-secondary me-2"

                  onClick={() => decreaseQuantity(cartItem.id)}

                  disabled={cartItem.quantity === 1}

                >
                  -

                </button>
                {/* Increment button */}
                <button
                  className="btn btn-secondary"

                  onClick={() => increaseQuantity(cartItem.id)}
                >
                  +
                </button>

              </div>

              {!orderPlaced && (

                <button className="btn btn-danger" onClick={() => removeFromCart(cartItem.id)}>

                  Remove

                </button>

              )}

            </li>

          ))}

        </ul>
      </div><br />
      {cart.length > 0 && !orderPlaced && (
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      )}
      {orderPlaced && !invoiceGenerated && (

        <div className="d-flex flex-column align-items-center mt-4">

          <div className="alert alert-success d-flex align-items-center" role="alert">

            <i className="bi bi-check-circle-fill me-2"></i> Order placed successfully!

          </div>

          <button className="btn btn-success mt-3" onClick={generateInvoice}>

            Generate Invoice

          </button>

        </div>

      )}
      {orderPlaced && invoiceGenerated && (
        <MDBContainer className="my-5">

          <MDBCard>

            <MDBCardBody>

              <MDBContainer className="mb-2 mt-3">

                <MDBRow className="d-flex align-items-baseline">

                  <MDBCol xl="9">

                    <p

                      style={{

                        color: "#7e8d9f",

                        fontSize: "20px",

                      }}

                    >

                      Invoice &gt; &gt;{' '}

                      <strong>ID: # {cart.map((cartItem) => cartItem.id).join(', ')}</strong>
                    </p>

                  </MDBCol>


                </MDBRow>

              </MDBContainer>

              <MDBCol xl="9" className='text-center'>

                <p

                  style={{

                    color: "#7e8d9f",

                    fontSize: "20px",

                  }}

                >
                  RetailStore.com
                </p>

              </MDBCol>

              <div className="alert alert-success d-flex align-items-center" role="alert">

                <i className="bi bi-check-circle-fill me-2"></i> Invoice Generated Successfully!!!!

              </div>

              <h2 className="mt-4">Ordered Products</h2>

              <MDBTable striped borderless>

                <MDBTableHead className="text-white" style={{ backgroundColor: '#9DC08B' }}>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col"> Unique ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">ProductType</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {cart.map((cartItem, index) => (
                    <tr key={cartItem.id}>
                      <td>{index + 1}</td>
                      <td>{cartItem.id}</td>
                      <td>{cartItem.name}</td>
                      <td>{cartItem.price}</td>
                      <td>{cartItem.quantity}</td>
                      <td>{cartItem.productType}</td>
                    </tr>
                  ))}
                  <MDBTypography listUnStyled>
                    <li className="text-muted ms-3">
                      <span className="text-black me-4">SubTotal</span>
                      {cart.map((cartItem) => (
                        <div key={cartItem.id}>
                          {cartItem.name} - Rs.{cartItem.price * cartItem.quantity}
                        </div>
                      ))}
                    </li>
                    <li className="text-muted ms-3 mt-2">

                      <span className="text-black me-4">Tax(5%)</span>

                      {cart.map((cartItem) => (

                        <div key={cartItem.id}>

                          {cartItem.name} - Rs.{(cartItem.price * 0.05 * cartItem.quantity).toFixed(2)}

                        </div>
                      ))}

                    </li>
                  </MDBTypography>
                  <p className="text-black float-start">
                    <span className="text-black me-3">Total Amount</span>
                    <span style={{ fontSize: "25px" }}>
                      {`Rs.${cart.reduce(
                        (total, cartItem) => total + cartItem.price * cartItem.quantity + cartItem.price * 0.05 * cartItem.quantity,
                        0).toFixed(2)}`}
                    </span>
                  </p>
                </MDBTableBody>

                <MDBRow className="d-flex justify-content-center">

                  <MDBCol xl="12">

                    <p style={{ color: 'green', fontSize: '24px', textAlign: 'center' }}>

                      !!!Thank you for your purchase!!!

                    </p>
                  </MDBCol>
                </MDBRow>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      )
      }
      <br /><br /><br /><br /><br /><br />
      <Footer />
    </div >
  );
};