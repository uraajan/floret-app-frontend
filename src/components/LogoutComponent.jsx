import { Link } from "react-router-dom";
import { Component } from 'react'

class LogoutComponent extends Component {

    render() {
        console.log("LogoutComponent: render")
        return (
            <h2>Click here to <Link to="/">login</Link></h2>
        )
    }

}

export default LogoutComponent