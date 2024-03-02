import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarToggler,
  MDBCollapse,
  MDBBadge,
  MDBBtn,
} from "mdb-react-ui-kit";
import "../assets/styles/navbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [showAnimated3, setShowAnimated3] = useState(false);
  const [cartLen, setCartLen] = useState(0); // Assuming initial cart length is 0

  return (
    
      <MDBNavbar
  dark
  style={{ backgroundColor: "#609966" }}
  className="p-0"
>
  <MDBContainer fluid>
    <br/><br/>
    <div className="d-flex justify-content-between align-items-center">
      {/* Navbar Brand */}
      <a href="/" className="navbar-brand">
        RetailStore
      </a>

      {/* Logout Button */}
      <button
        className="btn btn-danger"
        onClick={() => navigate("/")}
      >
        Log Out
      </button>
    </div>
  </MDBContainer>
</MDBNavbar>

     
    
  );
}
