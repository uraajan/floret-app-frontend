import { Component } from 'react'
import { connect } from 'react-redux'
import CartService from '../api/CartService'
import * as actionTypes from '../store/constants'

class CardComponent extends Component {

    constructor() {
        super()

        this.state = {
            productCount: 0
        }

        this.addToCart = this.addToCart.bind(this)

    }

    componentDidMount() {
        console.log("CardComponent: componentDidMount: this.props.id: ", this.props.id)
        this.setState({
            productCount: this.props.availabilityCount
        })
    }

    addToCart(productId) {
        console.log("CardComponent: addToCart: productId: ", productId)
        CartService.addToCartForUser(this.props.username, productId)
            .then(response => {
                console.log("addToCart: response.data: ", response.data)
                this.props.decrementAvailabilityCoutInGStore(productId)
                this.setState({
                    productCount: this.state.productCount - 1
                })
                console.log("CardComponent: addToCart: this.props.discountedPrice: ", this.props.discountedPrice)
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
        console.log("CardComponent: render: this.state.productCount: ", this.state.productCount)
        return (
            <>
                <div className="card bg-light soapCard">
                    <div className="card-header soapName"><span className="displayInlineBlock"><h4>Floret&nbsp;</h4></span><span className="soapType">{this.props.name}</span></div>
                    <img className="card-img-top soapImage" src="http://127.0.0.1:8081/src/resources/images/1533-200.png" alt="Card" />
                    <div className="card-body text-center">
                        <h4 className="card-text soapDiscountedPrice">₹{this.props.discountedPrice}</h4>
                        <h6 className="card-text">MRP: <span className="soapPrice">₹{this.props.price}</span> ({this.props.discountPercentage}% off)</h6>
                        <p className="card-text soapCategory">Suitable for {this.props.category} skin</p>
                        <h6 className="card-text">Available: {this.state.productCount}</h6>
                    </div>
                    {
                        this.state.productCount > 0
                            ? <button className="btnAddRemoveCheckout" onClick={()=> this.addToCart(this.props.id) }><span>Add to Cart</span></button>
                            : <button className="btnGrayOut"><span>Out of Stock</span></button>
                    }
                </div>
            </>
        )
    }

}

const mapStateToProps = globalStore => {
    return {
        username: globalStore.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        decrementAvailabilityCoutInGStore: (productId) => dispatch({ type: actionTypes.DECREMENT_AVAILABILITY_COUNT, productId })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent)