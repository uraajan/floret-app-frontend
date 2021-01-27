import { Component } from 'react'
import AdminService from '../api/AdminService'
import AdminOrderComponent from './AdminOrderComponent'

class AdminOrdersComponent extends Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {
        console.log("AdminOrdersComponent: componentDidMount")
        AdminService.getUnprocessedOrders()
            .then(response => {
                console.log("response.data: ", response.data)
                this.setState({
                    resposeData: response.data
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
        console.log("AdminOrdersComponent: render: ", {this.state.resposeData})
        return (

            <>
                
                {
                    this.state.resposeData && this.state.resposeData.map((order, index) => {
                        return <AdminOrderComponent key={index} {...order}></AdminOrderComponent>
                    })
                }

                <div>AdminOrdersComponent</div>
            </>
            
        )
    }
}

export default AdminOrdersComponent