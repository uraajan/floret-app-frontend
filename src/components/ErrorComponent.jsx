import { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ErrorComponent extends Component {

    constructor() {
        super()

        this.takeMeHome = this.takeMeHome.bind(this)
    }

    takeMeHome() {
        console.log("ErrorComponent: takeMeHome")
        this.props.history.push("/")
    }

    render() {
        console.log("ErrorComponent: render")
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="error-template">
                                <h1>Oops!</h1>
                                <br/>
                                <h2>404 Not Found</h2>
                                <br/>
                                <div className="error-details">
                                    Sorry, an error has occured. Requested page not found!
                                </div>
                                <br/>
                                <div className="error-actions">
                                    <button className="btnAddRemoveCheckout" onClick={ this.takeMeHome }><span>Take Me Home</span></button>
                                </div>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default withRouter(ErrorComponent)