import React, { Component } from "react";
import { DeleteProduct } from "./Product/DeleteProduct";
import { EditProduct } from "./Product/EditProduct";
import { ProductDetails } from "./Product/ProductDetailsById";
import { AddProduct } from "./Product/AddProduct";
import "./Product.css";
import { ViewAllProducts } from "./Product/ViewAllProducts";

export class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentNum: 0
        };
    }

    render() {
        return (
            <div className="container-fliud">
                <div className="row">
                    <div className="col-sm-3">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <button className="list-group-item flyer-sidebar green-button" onClick={() => this.setState({ componentNum: 1 })}>
                                    Add Product
                                </button>
                            </li>
                            <li className="list-group-item">
                                <button className="list-group-item flyer-sidebar green-button" onClick={() => this.setState({ componentNum: 2 })}>
                                    Edit Product Details
                                </button>
                            </li>
                            <li className="list-group-item">
                                <button className="list-group-item flyer-sidebar green-button" onClick={() => this.setState({ componentNum: 3 })}>
                                    View All Products
                                </button>
                            </li>
                            <li className="list-group-item">
                                <button className="list-group-item flyer-sidebar green-button" onClick={() => this.setState({ componentNum: 4 })}>
                                    Filter Products By Id
                                </button>
                            </li>
                            <li className="list-group-item">
                                <button className="list-group-item flyer-sidebar green-button" onClick={() => this.setState({ componentNum: 5 })}>
                                    Delete Product
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-9">
                        {this.state.componentNum === 1 ? <AddProduct /> : this.state.componentNum === 2 ? <EditProduct /> : this.state.componentNum === 3 ? <ViewAllProducts /> : this.state.componentNum === 4 ? <ProductDetails /> : <DeleteProduct />}
                    </div>
                </div>
            </div>
        );
    }
}
