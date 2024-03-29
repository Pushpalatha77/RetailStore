 

import React, { useState } from "react";

import {

  MDBBtn,

  MDBInput,

  MDBContainer,

  MDBRow,

  MDBCol,

  MDBCard,

  MDBCardBody,

  MDBCheckbox,

  MDBTypography,

  MDBValidation,

  MDBValidationItem,

} from "mdb-react-ui-kit";

import "../assets/styles/registerForm.css";

import { useNavigate } from "react-router-dom";

 

function RegisterForm() {

  const navigate = useNavigate();

  // Regex for mobile number starting with 7, 8, or 9

  const mobileRegex = /^[789]\d{9}$/;

 

  // Regex for password validation: min 6 characters, at least one uppercase, one lowercase, one number, and one special character

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

 

  const [user, setUser] = useState({

    userName: "",

    userPassword: "",

  });

  const [address, setAddress] = useState({

    buildingNo: "",

    areaName: "",

    city: "",

    state: "",

    zip: 0,

  });

  const [cust, setCust] = useState({

    customerName: "",

    mobileNo: "",

    email: "",

  });

 

  function handleCustChange(event) {

    const { name, value } = event.target;

 

    setCust((prevCust) => ({

      ...prevCust,

      [name]: value,

    }));

  }

 

  function handleAddressChange(event) {

    const { name, value } = event.target;

 

    setAddress((prevAdd) => ({

      ...prevAdd,

      [name]: value,

    }));

  }

 

  function handleUserChange(event) {

    const { name, value } = event.target;

 

    setUser((prevUser) => ({

      ...prevUser,

      [name]: value,

    }));

  }

 

  async function handleRegister(event) {

    event.preventDefault();

 // Validate mobile number

 if (!mobileRegex.test(cust.mobileNo)) {

    // Handle mobile number validation error

    console.error("Invalid mobile number");

    return;

  }

 

  // Validate email

  if (!emailRegex.test(cust.email)) {

    // Handle email validation error

    console.error("Invalid email address");

    return;

  }

  // You can use a similar regex to validate email

 

  // Validate password

  if (!passwordRegex.test(user.userPassword)) {

    // Handle password validation error

    console.error("Invalid password");

    return;

  }

    // Construct the registration payload

    const registrationData = {

      ...user,

      ...cust,

      ...address,

    };

 

    try {

      // Send POST request to the registration API

      const response = await fetch("http://localhost:2000/register", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify(registrationData),

      });

 

      if (response.ok) {

        // Registration successful, redirect to a success page

        console.log(response.body);

        navigate("/"); // Change this to your desired success page route

      } else {

        // Handle registration failure

        console.error("Registration failed");

      }

    } catch (error) {

      console.error("Error during registration:", error);

    }

  }

 

  return (

    <MDBContainer fluid className="h-custom mb-10">

            <MDBRow className="d-flex justify-content-center align-items-center h-100">

                <MDBCol col="12" className="m-5">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <MDBTypography

                            style={{ color: "#40513B" }}

                            tag="h3"

                            className="fw-normal mb-0 text-black"

                        >

                            Create Account

                        </MDBTypography>

                    </div>

                    <MDBCard

                        className="card-registration card-registration-2"

                        style={{ borderRadius: "15px" }}

                    >

                        <MDBCardBody className="p-0">

                            <MDBRow>

                                <MDBCol md="6" className="p-5 bg-white">

                                    <h3

                                        className="fw-normal mb-5"

                                        style={{ color: "#40513B" }}

                                    >

                                        General Infomation

                                    </h3>

                                    <MDBValidation isValidated>

                                        <MDBValidationItem

                                            feedback="Enter your full name"

                                            invalid

                                        >

                                            <MDBInput

                                                onChange={handleCustChange}

                                                name="customerName"

                                                wrapperClass="mb-4"

                                                label="Full Name*"

                                                size="lg"

                                                id="form1"

                                                type="text"

                                                value={cust.customerName}

                                                required

                                                autoComplete="off"

                                            />

                                        </MDBValidationItem>

 

                                        <MDBValidationItem

                                            feedback="Please provide a valid 10 Digit number."

                                            invalid

                                        >

                                            <MDBInput

                                                onChange={handleCustChange}

                                                wrapperClass="mb-4"

                                                name="mobileNo"

                                                label="Mobile Number*"

                                                size="lg"

                                                id="form2"

                                                type="number"

                                                value={cust.mobileNo}

                                                required

                                                autoComplete="off"

                                            />

                                        </MDBValidationItem>

                                        <MDBValidationItem

                                            feedback="Please provide a valid email."

                                            invalid

                                        >

                                            <MDBInput

                                                onChange={handleCustChange}

                                                name="email"

                                                wrapperClass="mb-4"

                                                label="Email ID*"

                                                size="lg"

                                                id="form3"

                                                type="email"

                                                value={cust.email}

                                                required

                                                autoComplete="off"

                                            />

                                        </MDBValidationItem>

                                        <MDBValidationItem

                                            feedback="Please choose a username."

                                            invalid

                                        >

                                            <MDBInput

                                                onChange={handleUserChange}

                                                name="userName"

                                                wrapperClass="mb-4"

                                                label="Username*"

                                                size="lg"

                                                id="form4"

                                                type="text"

                                                value={user.userName}

                                                required

                                                autoComplete="off"

                                            />

                                        </MDBValidationItem>

                                        <MDBValidationItem

                                            feedback="Please set a strong password."

                                            invalid

                                        >

                                            <MDBInput

                                                onChange={handleUserChange}

                                                name="userPassword"

                                                wrapperClass="mb-4"

                                                label="Password*"

                                                size="lg"

                                                id="form5"

                                                type="password"

                                                value={user.userPassword}

                                                required

                                                autoComplete="off"

                                            />

                                        </MDBValidationItem>

                                    </MDBValidation>

                                </MDBCol>

 

                                <MDBCol

                                    md="6"

                                    className="bg-indigo p-5 text-white"

                                >

                                    <h3

                                        className="fw-normal mb-5 text-white"

                                        style={{ color: "#4835d4" }}

                                    >

                                        Address Details

                                    </h3>

                                    <MDBValidation isValidated>

                                        <MDBRow>

                                            <MDBCol md="5">

                                                <MDBValidationItem

                                                    feedback="Please provide a building No."

                                                    invalid

                                                >

                                                    <MDBInput

                                                        style={{

                                                            color: "black",

                                                        }}

                                                        onChange={

                                                            handleAddressChange

                                                        }

                                                        name="buildingNo"

                                                        wrapperClass="mb-4"

                                                        labelClass="text-white"

                                                        label="Building No*"

                                                        size="lg"

                                                        id="form6"

                                                        type="text"

                                                        value={

                                                            address.buildingNo

                                                        }

                                                        required

                                                        autoComplete="off"

                                                    />

                                                </MDBValidationItem>

                                            </MDBCol>

 

                                            <MDBCol md="7">

                                                <MDBValidationItem

                                                    feedback="Please provide a valid zip."

                                                    invalid

                                                >

                                                    <MDBInput

                                                        style={{

                                                            color: "black",

                                                        }}

                                                        onChange={

                                                            handleAddressChange

                                                        }

                                                        name="zip"

                                                        wrapperClass="mb-4"

                                                        labelClass="text-white"

                                                        label="Zip Code*"

                                                        size="lg"

                                                        id="form7"

                                                        type="number"

                                                        value={address.zip}

                                                        autoComplete="off"

                                                    />

                                                </MDBValidationItem>

                                            </MDBCol>

                                        </MDBRow>

                                        <MDBValidationItem

                                            feedback="Please provide a valid Area."

                                            invalid

                                        >

                                            <MDBInput

                                                style={{ color: "black" }}

                                                onChange={handleAddressChange}

                                                name="areaName"

                                                wrapperClass="mb-4"

                                                labelClass="text-white"

                                                label="Area/Locality*"

                                                size="lg"

                                                id="form8"

                                                type="text"

                                                value={address.areaName}

                                                required

                                                autoComplete="off"

                                            />

                                        </MDBValidationItem>

                                        <MDBValidationItem

                                            feedback="Please provide a valid city."

                                            invalid

                                        >

                                            <MDBInput

                                                style={{ color: "black" }}

                                                onChange={handleAddressChange}

                                                name="city"

                                                wrapperClass="mb-4"

                                                labelClass="text-white"

                                                label="City*"

                                                size="lg"

                                                id="form9"

                                                type="text"

                                                value={address.city}

                                                required

                                                autoComplete="off"

                                            />

                                        </MDBValidationItem>

                                        <MDBValidationItem

                                            feedback="Please provide a valid state."

                                            invalid

                                        >

                                            <MDBInput

                                                style={{ color: "black" }}

                                                onChange={handleAddressChange}

                                                name="state"

                                                wrapperClass="mb-4"

                                                labelClass="text-white"

                                                label="State*"

                                                size="lg"

                                                id="form10"

                                                type="text"

                                                value={address.state}

                                                required

                                                autoComplete="off"

                                            />

                                        </MDBValidationItem>

                                        <MDBValidationItem

                                            feedback="You must agree before submitting."

                                            invalid

                                        >

                                            <MDBCheckbox

                                                name="flexCheck"

                                                id="flexCheckDefault"

                                                labelClass="text-white mb-4"

                                                label="I do accept the Terms and Conditions of your site.*"

                                                required

                                            />

                                        </MDBValidationItem>

                                        <br />

                                        <MDBBtn

                                            onClick={handleRegister}

                                            style={{

                                                backgroundColor: "#EDF1D6",

                                            }}

                     

                                            size="lg"

                                            color="black"

                                            type="submit"

                                        >

                                            Register

                                        </MDBBtn>

                                    </MDBValidation>

                                </MDBCol>

                            </MDBRow>

                        </MDBCardBody>

                    </MDBCard>

                </MDBCol>

            </MDBRow>

        </MDBContainer>

    );

}

 

export default RegisterForm;

 