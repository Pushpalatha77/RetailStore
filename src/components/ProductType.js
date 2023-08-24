import { Component } from "react";
import { AddProductType } from "./ProductType/AddProductType";
import { DeleteProductType } from "./ProductType/DeleteProductType";
import { EditProductType } from "./ProductType/EditProductType";
import { ProductTypeList } from "./ProductType/ProductTypeList";
import { ProductTypeById } from "./ProductType/ProductTypeById";
import "./ProductType.css";
export class ProductType extends Component {

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
                                <button className="list-group-item flyer-sidebar green-button"
                                    onClick={() => (this.setState({ componentNum: 1 }))}>
                                    Add Product Type
                                </button>
                            </li>
                            <li className=" list-group-item"> 
                                <button className="list-group-item flyer-sidebar green-button" onClick={() => {
                                    this.setState({ componentNum: 2 })
                                     }} >Edit Product Type Details
                                </button>
                            </li>
                            <li className="list-group-item">
                                <button className="list-group-item flyer-sidebar green-button" onClick={() => (this.setState({ componentNum: 3 }))}>
                                    View All Product Types
                                </button>
                            </li>
                            <li className="list-group-item">
                                <button className="list-group-item flyer-sidebar green-button" onClick={() => (this.setState({ componentNum: 4 }))}>
                                    Filter Product Types By Id
                                </button>
                            </li>
                            <li className="list-group-item">
                                <button className="list-group-item flyer-sidebar green-button" 
                                 onClick={() => 
                                    (this.setState({ componentNum: 5 }))}>
                                    Delete Product Type
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-9">
                        {this.state.componentNum === 1 ?
                            <AddProductType /> : this.state.componentNum === 2 ?
                            <EditProductType /> : this.state.componentNum === 3 ?
                            <ProductTypeList /> : this.state.componentNum === 4 ?
                            <ProductTypeById /> : <DeleteProductType />
                        }
                    </div>
                </div>
            </div>
        );
    }
}