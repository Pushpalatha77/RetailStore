import React from 'react';
import './AdminDashboard.css'
import { Link } from 'react-router-dom';
const AdminDashboard = () => {
    return (
        <div className="container">

            <h2 >Admin Dashboard</h2>
            <br />

            <div className="admin-dashboard">

                <div>
                    <Link to="/product" className='link'>
                        <div className="card" id="manage-customer">
                            <img src="https://media.istockphoto.com/id/1249219777/photo/shopping-online-concept-parcel-or-paper-cartons-with-a-shopping-cart-logo-in-a-trolley-on-a.jpg?s=1024x1024&w=is&k=20&c=Gsr6lZkBHjjeP5o18w9_mvnWxMZBqB-ncOi6tqh87hM=" alt="Manage Customer" />
                            <h3>Manage Product</h3>
                        </div>
                    </Link>

                </div>

                <div>

                    <Link to="/productType" className='link'>
                        <div className="card" id="manage-payment">
                            <img src="https://media.istockphoto.com/id/1333809608/photo/overhead-image-of-people-buying-in-the-large-supermarket.jpg?s=1024x1024&w=is&k=20&c=jnGJkELZxCg0rnmWcq2oIi3ipXgQ13Zdn9hygDAEQps=" alt="Manage Payment" />
                            <h3>Manage Product Type</h3>
                        </div>
                    </Link>

                </div>

            </div >

        </div>
    );

};



export default AdminDashboard;