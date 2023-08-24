import React from 'react';
import logo from './logo.svg';
import './App.css';


import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import RegisterForm from './components/Auth/RegisterForm';
import LoginPage from './components/pages/LoginPage';
import ProfilePage from './components/pages/ProfilePage';
import { ProductList } from './components/Product/ProductList';
import { ProductTypeList } from './components/ProductType/ProductTypeList';
import OrderedProductsList from './components/Product/OrderedProductsList';
import WishListProducts from './components/Product/WishListProducts';
import { ProductType } from './components/ProductType';
import AdminDashboard from './components/Product/AdminDashboard';
import { Product } from './components/Product';
import { AddProduct } from './components/Product/AddProduct';
import { ViewAllProducts } from './components/Product/ViewAllProducts';

function App() {
 
  return (
    <div>
      
      <Router>
      
        <Routes>
        
        <Route path="/" element={<LoginPage/>}></Route>
          
          <Route path="/addproduct" element={<AddProduct/>}></Route>
          <Route path="/register" element={<RegisterForm/>}></Route>
          <Route path="/profile" element={<ProfilePage/>}></Route>
          <Route path="/all-products" element={<ProductList/>}></Route>
          <Route path="/your-orders" element={<OrderedProductsList/>}></Route>
          <Route path="/wishlist" element={<WishListProducts/>}></Route>
          <Route path="/AdminDashboard" element={<AdminDashboard/>}></Route>
          <Route path="/product" element={<Product/>}></Route>
          <Route path="/productType" element={<ProductType/>}></Route>
          <Route path="/viewproducts" element={<ViewAllProducts/>}></Route>
         
        </Routes>
      </Router>
     
    </div>
    
  );
}

export default App;
