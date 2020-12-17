import { Component } from 'react'
import OrderComponent from './OrderComponent'

class OrdersComponent extends Component {

    render() {
        return (
            <>
                <OrderComponent></OrderComponent>
                <OrderComponent></OrderComponent>
            </>
        )
    }

}

export default OrdersComponent