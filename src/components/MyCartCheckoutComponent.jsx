import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class MyCartCheckoutComponent extends Component {

    constructor() {
        super()

        this.checkOut = this.checkOut.bind(this)
    }

    checkOut() {
        console.log("MyCartCheckoutComponent: checkOut")
        this.props.history.push("/checkout")
    }

    render() {
        console.log("MyCartCheckoutComponent: render: ", this.props.totalCartValue)
        return (
            <>
                
                <br />
                <div>Total items: <b>{this.props.totalCartItems}</b></div>
                <br />
                <div>Total price: <b>₹{this.props.totalCartValue}</b></div>
                <br /><br />
                {
                    this.props.totalCartItems > 0
                        ? <button className="btnAddRemoveCheckout"><span onClick={ this.checkOut }>Checkout</span></button>
                        : <button className="btnGrayOut"><span>Checkout</span></button>
                }
                
            </>
        )
    }

}

const mapStateToProps = globalStore => {
    return {
        totalCartItems: globalStore.totalCartItems,
        totalCartValue: globalStore.totalCartValue
    }
}

export default withRouter(connect(mapStateToProps)(MyCartCheckoutComponent))