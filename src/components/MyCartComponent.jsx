import { Component } from 'react'
import { connect } from 'react-redux'
import CartService from '../api/CartService'
import MyCartCardComponent from './MyCartCardComponent'
import MyCartCheckoutComponent from './MyCartCheckoutComponent'
import * as actionTypes from '../store/constants';

class MyCartComponent extends Component {

    constructor() {
        super()

        this.state = {
            responseData: []
        }
    }

    componentDidMount() {
        console.log("MyCartComponent: componentDidMount")
        CartService.getCartDataForUser(this.props.username)
            .then(response => {
                console.log("componentDidMount: response.data", response.data)
                this.props.setTotalCartItemsValue(response.data.cartItems, response.data.cartValue)
                this.setState({
                    responseData: response.data.cartData
                })
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
        console.log("MyCartComponent: render")
        return (
            <>
                <div className="card-columns displayInlineBlock cartItems">

                    {
                        
                        this.state.responseData && this.state.responseData.map((cartItem, index) =>
                            <MyCartCardComponent key={index} {...cartItem}></MyCartCardComponent>
                        )
                            
                    }
                    
                </div>

                <div className="displayInlineBlock cartSpaceFill">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>

                <div className="displayInlineBlock cartValue">
                    <MyCartCheckoutComponent></MyCartCheckoutComponent>
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
        setTotalCartItemsValue: (items, value) => dispatch({type: actionTypes.SET_TOTAL_CART_ITEMS_VALUE, items, value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCartComponent)