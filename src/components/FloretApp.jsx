import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import CheckoutComponent from './CheckoutComponent';
import ErrorComponent from './ErrorComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import MyCartComponent from './MyCartComponent';
import OrderConfirmationComponent from './OrderConfirmationComponent';
import OrdersComponent from './OrdersComponent';
import ProfileComponent from './ProfileComponent';
import RegisterComponent from './RegisterComponent';
import UnauthenticatedRoute from './UnauthenticatedRoute';

class FloretApp extends Component {
    render() {
        console.log("FloretApp: render")
        return (
            <div>
                <Router>
                    <>
                        <Route component = {HeaderComponent} />
                        <Switch>
                            <UnauthenticatedRoute path="/" exact component={LoginComponent} />
                            <UnauthenticatedRoute path="/logout" component={LogoutComponent} />
                            <UnauthenticatedRoute path="/login" component={LoginComponent} />
                            <UnauthenticatedRoute path="/register" component={RegisterComponent} />
                            <AuthenticatedRoute path="/home" component={HomeComponent} />
                            <AuthenticatedRoute path="/profile" component={ProfileComponent} />
                            <AuthenticatedRoute path="/cart" component={MyCartComponent} />
                            <AuthenticatedRoute path="/checkout" component={CheckoutComponent} />
                            <AuthenticatedRoute path="/order-confirmation" component={OrderConfirmationComponent} />
                            <AuthenticatedRoute path="/orders" component={OrdersComponent} />
                            <Route component={ErrorComponent}></Route>
                        </Switch>
                        <Route component = {FooterComponent} />
                    </>
                </Router>
            </div>
        );
    }
}

export default FloretApp