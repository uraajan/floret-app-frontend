import { Component } from 'react'
import { connect } from 'react-redux'
import OrderService from '../api/OrderService'
import OrderComponent from './OrderComponent'

class OrdersComponent extends Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {
        console.log("OrdersComponent: componentDidMount")
        OrderService.getOrdersForUser(this.props.username)
            .then(response => {
                console.log("response.data: ", response.data)
                this.setState({
                    responseData: response.data
                })
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log("error.response.data: ", error.response.data)
                } else if (error.message) {
                    console.log("error.message: ", error.message)
                }
            })
    }

    render() {
        console.log("OrdersComponent: render: ", this.state.responseData)
        return (
            <>

                {
                    this.state.responseData && this.state.responseData.map((order, index) => {
                        return <OrderComponent key={index} {...order}></OrderComponent>
                    })
                }

            </>
        )
    }

}

const mapStateToProps = globalStore => {
    return {
        username: globalStore.username
    }
}

export default connect(mapStateToProps)(OrdersComponent)