import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import FireImg from "../assets/images/fire.jpg";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInvalidCredentialsAlert, setShowInvalidCredentialsAlert] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const registeredUsers = [
    {
      userName: "SWEETY",
      userPassword: "Sweety@123",
    },
    {
      userName: "ADMIN",
      userPassword: "Admin@123", // Corrected password
    },
    // Add more users as needed
  ];

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const foundUser = registeredUsers.find(
      (registeredUser) =>
        registeredUser.userName === user.userName &&
        registeredUser.userPassword === user.password
    );

    if (foundUser) {
      setShowSuccess(true);
      setShowInvalidCredentialsAlert(false);
      if (foundUser.userName === "ADMIN") {
        navigate("/AdminDashboard"); // Redirect to admin dashboard
      } else {
        navigate("/profile"); // Redirect to user profile
      }
    } else {
      setShowSuccess(false);
      setShowInvalidCredentialsAlert(true);
      // Handle failed login case
    }
  }
  
  
  return (
    <MDBContainer className="my-5">
      {showSuccess && (
        <div className="alert alert-success">
          <h5 className="alert-heading">Yay! Welcome {user.userName}!</h5>
        </div>
      )}
      {showInvalidCredentialsAlert && ( // Display invalid credentials alert
        <div className="alert alert-danger">
          <h5 className="alert-heading">Invalid credentials. Please try again.</h5>
        </div>
      )}
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
               src={FireImg}
              height="550px"
              alt="login form"
              className="rounded-start w-100"
              style={{ objectFit: "cover" }}
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <MDBIcon
                  fas
                  icon="fas fa-hiking fa-3x me-3"
                  style={{ color: "#609966" }}
                />
                <span className="h1 fw-bold mb-0" style={{ color: "#2ECC71", letterSpacing: "2px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>
  RETAIL STORE<br />MANAGEMENT SYSTEM
</span>
      </div>

              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h5>

              <MDBInput
                wrapperClass="mb-4"
                onChange={handleChange}
                type="text"
                name="userName"
                id="userName"
                value={user.userName}
                label="Enter your UserName"
                size="lg"
                autoComplete="off"
              />
              <MDBInput
                wrapperClass="mb-4"
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                value={user.password}
                label="Enter your Password"
                size="lg"
                autoComplete="off"
              />

              <MDBBtn
                onClick={handleSubmit}
                className="mb-4 px-5"
                color="dark"
                size="lg"
                style={{
                  backgroundColor: "#40513B",
                }}
              >
                Login
              </MDBBtn>
              <p className="mb-5 pb-lg-2" style={{ color: "#40513B" }}>
                Don't have an account?{" "}
                <a href="/register" style={{ color: "#40513B" }}>
                  Register here
                </a>
              </p>

              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}
