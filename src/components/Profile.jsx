import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBTypography,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from "mdb-react-ui-kit";
import OrderImg from "./assets/images/order.jpg";
import WishImg from "./assets/images/wish.jpg";
import mockDatabase from '../api/db.json'; // Import the mock database
export default function Profile() {

    const { username } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userId: 0,
        userName: "",
        userPassword: "",
    });
    const [address, setAddress] = useState({
        addressId: 0,
        buildingNo: "",
        areaName: "",
        city: "",
        state: "",
        zip: 0,
    });
    const [cust, setCust] = useState({
        customerId: 0,
        customerName: "",
        mobileNo: "",
        email: "",

    });
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    useEffect(() => {
        const loginCredentials = {
            userName: "SWEETY",
            userPassword: "Sweety@123",
        };

        // // Fetch user data from the mock database
        const foundUser = mockDatabase.register.find(
            (u) =>
                u.userName === loginCredentials.userName &&
                u.userPassword === loginCredentials.userPassword
        );

        if (foundUser) {
            setUser({
                userId: foundUser.id,
                userName: foundUser.userName,
                userPassword: foundUser.userPassword,
            });

            setAddress({
                addressId: foundUser.id,
                buildingNo: foundUser.buildingNo,
                areaName: foundUser.areaName,
                city: foundUser.city,
                state: foundUser.state,
                zip: foundUser.zip,
            });

            setCust({
                customerId: foundUser.id,
                customerName: foundUser.customerName,
                mobileNo: foundUser.mobileNo,
                email: foundUser.email,
            });
        } else {
            console.log("User not found");
        }
    }, [username]);

    function goToWishlist() {
        console.log("Going to Wishlist page");
        navigate("/wishlist");
    }

    function goToOrders() {
        console.log("Going to view Orders");
        navigate("/your-orders");
    }

    return (
        <section>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={toggleShow}>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb
                            style={{ backgroundColor: "#fbffe5" }}
                            className="rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem>
                                <a href="/">Home</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem active>
                                {cust.customerName}'s Profile
                            </MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard
                            style={{ backgroundColor: "#fbffe5" }}
                            className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: "150px" }}
                                    fluid/>
                                <br />
                                <br />

                                <p className="text-muted mb-1">
                                    Esteemed Customer
                                </p>

                                <p className="text-muted mb-4">
                                    {address.city}, {address.state}
                                </p>

                                <div className="d-flex justify-content-center mb-2">
                                    <h1>Welcome</h1>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard
                            style={{ backgroundColor: "#fbffe5" }}
                            className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {cust.customerName}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>UserName</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {user.userName}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {cust.email}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Phone</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            (+91) {cust.mobileNo}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />

                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {address.buildingNo},{" "}
                                            {address.areaName}, {address.city},{" "}
                                            {address.state}, {address.zip}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                        <MDBRow>
                            <MDBCol md="6">
                                <MDBCard
                                    onClick={goToOrders}
                                    className="mb-4 mb-md-0 card-wrapper"
                                    style={{
                                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${OrderImg})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        position: "relative",
                                    }}>
                                    <MDBCardBody>
                                        <MDBCardText>
                                            <MDBTypography
                                                tag="h3"
                                                className="fw-normal mb-0 text-white">
                                                Your Past Orders
                                            </MDBTypography>
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>

                            <MDBCol md="6">
                                <MDBCard
                                    onClick={goToWishlist}
                                    className="mb-4 mb-md-0 card-wrapper"
                                    style={{
                                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${WishImg})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        position: "relative",
                                    }}>
                                    <MDBCardBody>
                                        <MDBCardText>
                                            <MDBTypography
                                                tag="h3"
                                                className="fw-normal mb-0 text-white"   >
                                                Your Wishlist
                                            </MDBTypography>
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}