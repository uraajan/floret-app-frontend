import { Component } from 'react'
import { connect } from 'react-redux'
import CartService from '../api/CartService'
import * as actionTypes from '../store/constants';

function Card(props) {
    return (
        <>
            <div className="card bg-light soapCard">
                <div className="card-header soapName"><span className="displayInlineBlock"><h4>Floret&nbsp;</h4></span><span className="soapType">{props.productName}</span></div>
                <img className="card-img-top soapImage" src="http://127.0.0.1:8081/src/resources/images/1533-200.png" alt="Card" />
                <div className="card-body text-center">
                    <h6 className="card-text">Count: { props.count }</h6>
                    <h6 className="card-text">Price: ₹{ props.count * props.productPrice }</h6>
                </div>
                <button className="btnAddRemoveCheckout"><span onClick={ props.removeFromCartOnClick }>Remove from Cart</span></button>
            </div>
        </>
    )
}

class MyCartCardComponent extends Component {

    constructor() {
        super()

        this.state = {
            productCount: 0
        }

        this.removeFromCart = this.removeFromCart.bind(this)
    }

    componentDidMount() {
        console.log("MyCartCardComponent: componentDidMount: this.props.productCount: ", this.props.productCount)
        this.setState({
            productCount: this.props.productCount
        })
    }

    removeFromCart(productId) {
        console.log("MyCartCardComponent: removeFromCart: productId: ", productId)
        
        CartService.removeFromCartForUser(this.props.username, productId)
            .then(response => {
                console.log("removeFromCart: response.data: ", response.data)
                this.setState({
                    productCount: this.state.productCount - 1
                })
                this.props.incrementAvailabilityCoutInGStore(productId)
                this.props.setTotalCartItemsValue((this.props.totalCartItems - 1), (this.props.totalCartValue - this.props.productPrice))
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log("componentDidMount: error.response.data: ", error.response.data)
                } else if (error.message) {
                    console.log("componentDidMount: error.message: ", error.message)
                }
            })
    }

    render() {
        console.log("MyCartCardComponent: render: this.state.productCount: ", this.state.productCount)
        return (
            this.state.productCount
                ? <Card {...this.props} removeFromCartOnClick={() => this.removeFromCart(this.props.productId)} count={this.state.productCount} />
                : <></>
        )
    }

}

const mapStateToProps = globalStore => {
    return {
        username: globalStore.username,
        totalCartItems: globalStore.totalCartItems,
        totalCartValue: globalStore.totalCartValue
    }
}

const mapDispatchToProps = dispatch => {
    return {
        incrementAvailabilityCoutInGStore: (productId) => dispatch({ type: actionTypes.INCREMENT_AVAILABILITY_COUNT, productId }),
        setTotalCartItemsValue: (items, value) => dispatch({type: actionTypes.SET_TOTAL_CART_ITEMS_VALUE, items, value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCartCardComponent)