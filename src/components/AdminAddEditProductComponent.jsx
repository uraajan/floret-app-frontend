import { Component } from 'react'
import { connect } from 'react-redux'
import AdminService from '../api/AdminService'
import * as actionTypes from '../store/constants'

class AdminAddEditProductComponent extends Component {

    constructor() {
        super()

        this.state = {
            id: 0,
            name: "",
            price: 0,
            discountPercentage: 0,
            discountedPrice: 0,
            category: "",
            availabilityCount: 0,
            addEditProductError: ""
        }

        this.addOrEditProduct = this.addOrEditProduct.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.validateAdminInputs = this.validateAdminInputs.bind(this)
    }

    componentDidMount() {
        console.log("AdminAddEditProductComponent: componentDidMount")
        if (this.props.productId > 0) {
            AdminService.getProductForId(this.props.productId)
                .then(response => {
                    console.log("response.data: ", response.data)
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        price: response.data.price,
                        discountPercentage: response.data.discountPercentage,
                        discountedPrice: response.data.discountedPrice,
                        category: response.data.category,
                        availabilityCount: response.data.availabilityCount
                    })
                    this.props.resetProductIdToEditInGStore()
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        console.log("error.response.data: ", error.response.data)
                    } else if (error.message) {
                        console.log("error.message: ", error.message)
                    }
                })
        }
    }

    addOrEditProduct() {
        console.log("AdminAddEditProductComponent: updateProduct")
        if (this.validateAdminInputs()) {
            AdminService.addOrEditProduct(this.state.id, this.state.name, this.state.price, this.state.discountPercentage,
                this.state.discountedPrice, this.state.category, this.state.availabilityCount)
                .then(respose => {
                    console.log("response.data: ", respose.data)
                    this.props.history.push("/admin-home")
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        console.log("error.response.data: ", error.response.data)
                    } else if (error.message) {
                        console.log("error.message: ", error.message)
                    }
                })
        }
    }

    validateAdminInputs() {
        console.log("AdminAddEditProductComponent: validateAdminInputs")
        if (this.state.name === undefined || this.state.name.length <= 0) {
            this.setState({
                addEditProductError: "Please enter a valid product name"
            })
            return false
        } else if (this.state.price === undefined || this.state.price.length <=0 || this.state.price <= 0) {
            this.setState({
                addEditProductError: "Please enter a valid product price"
            })
            return false
        } else if (this.state.discountPercentage === undefined || this.state.discountPercentage.length <= 0 || this.state.discountPercentage <= 0) {
            this.setState({
                addEditProductError: "Please enter a valid discount percentage"
            })
            return false
        } else if (this.state.category === undefined || this.state.category.length <= 0) {
            this.setState({
                addEditProductError: "Please enter a valid category"
            })
            return false
        } else if (this.state.availabilityCount === undefined || this.state.availabilityCount.length <= 0 || this.state.availabilityCount < 0) {
            this.setState({
                addEditProductError: "Please enter a valid availability count"
            })
            return false
        } else if (this.state.discountPercentage > 70) {
            this.setState({
                addEditProductError: "Max discount allowed: 70"
            })
            return false
        }
        this.setState({
            addEditProductError: ""
        })
        return true
    }

    handleTextChange(event) {
        console.log("AdminAddEditProductComponent: handleTextChange")
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <>
                <div>
                    {this.state.id ? <h1>Edit product</h1> : <h1>Add product</h1>}
                    {this.state.addEditProductError && <div className="alert alert-warning">{this.state.addEditProductError}</div>}
                    <div className="shadow p-3 mb-5 bg-white rounded">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Field</th>
                                    <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Variant</td>
                                    <td><input type="text" name="name" onChange={this.handleTextChange} value={this.state.name}></input></td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td><input type="number" name="price" onChange={this.handleTextChange} value={this.state.price}></input></td>
                                </tr>
                                <tr>
                                    <td>Discount percentage</td>
                                    <td><input type="number" name="discountPercentage" onChange={this.handleTextChange} value={this.state.discountPercentage}></input></td>
                                </tr>
                                <tr>
                                    <td>Discounted price</td>
                                    <td><input type="number" name="discountedPrice" disabled onChange={this.handleTextChange} value={this.state.discountedPrice}></input></td>
                                </tr>
                                <tr>
                                    <td>Category</td>
                                    <td><input type="text" name="category" onChange={this.handleTextChange} value={this.state.category}></input></td>
                                </tr>
                                <tr>
                                    <td>Availability Count</td>
                                    <td><input type="number" name="availabilityCount" onChange={this.handleTextChange} value={this.state.availabilityCount}></input></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {
                        this.state.id
                            ? <button onClick={this.addOrEditProduct}>Update</button>
                            : <button onClick={this.addOrEditProduct}>Save</button>
                    }
                </div>
            </>
        )
    }

}

const mapStateToProps = globalStore => {
    return {
        productId: globalStore.productIdToEdit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetProductIdToEditInGStore: () => dispatch({type: actionTypes.SET_PRODUCT_ID_TO_EDIT, val:0})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddEditProductComponent)