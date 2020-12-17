import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import OrderService from '../api/OrderService'
import UserService from '../api/UserService'
import * as actionTypes from '../store/constants';

class CheckoutComponent extends Component {

    constructor() {
        super()

        this.state = {
            address: "",
            mobileNo: ""
        }

        this.backToCart = this.backToCart.bind(this)
        this.placeOrder = this.placeOrder.bind(this)
    }

    backToCart() {
        console.log("CheckoutComponent: backToCart")
        this.props.history.push("/cart")
    }

    placeOrder() {
        console.log("CheckoutComponent: placeOrder")
        OrderService.placeOrderForUser(this.props.username)
            .then(response => {
                this.props.setLastOrderIdOfUser(response.data)
                this.props.history.push("/order-confirmation")
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log("error.response.data: ", error.response.data)
                } else if (error.message) {
                    console.log("error.message: ", error.message)
                }
            })
    }

    componentDidMount() {
        console.log("CheckoutComponent: componentDidMount")
        UserService.getUserByUsername(this.props.username)
            .then(response => {
                this.setState({
                    address: response.data.address,
                    mobileNo: response.data.mobileNo
                })
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log("getUserDetails: error.response.data: ", error.response.data)
                } else if (error.message) {
                    console.log("getUserDetails: error.message: ", error.message)
                }
            })
    }

    render() {
        console.log("CheckoutComponent: render")
        return (
            <>
                <h2>Order Details</h2>
                <br/>
                <h4>Total items: {this.props.totalCartItems}</h4>
                <br/>
                <h4>Amount: ₹{this.props.totalCartValue}</h4>
                <br /><br/>
                <h2>Contact Details</h2>
                <br/>
                <h4>{this.props.firstName} {this.props.lastName}</h4>
                <br />
                <h4>{this.state.address}</h4>
                <br />
                <h4>{this.state.mobileNo}</h4>
                <br />
                <button className="btnAddRemoveCheckout" onClick={this.backToCart}><span>Back to Cart</span></button>
                &nbsp;&nbsp;&nbsp;
                <button className="btnAddRemoveCheckout" onClick={this.placeOrder }><span>Confirm and Place Order</span></button>
            </>
        )
    }

}

const mapStateToProps = globalStore => {
    return {
        username: globalStore.username,
        firstName: globalStore.firstName,
        lastName: globalStore.lastName,
        totalCartItems: globalStore.totalCartItems,
        totalCartValue: globalStore.totalCartValue
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLastOrderIdOfUser: (lastOrderId) => dispatch({type: actionTypes.SET_LAST_ORDER_ID, lastOrderId})
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutComponent))