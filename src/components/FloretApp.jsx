import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminAddEditProductComponent from './AdminAddEditProductComponent';
import AdminHomeComponent from './AdminHomeComponent';
import AdminComponent from './AdminLoginComponent';
import AdminOrdersComponent from './AdminOrdersComponent';
import AdminRoute from './AdminRoute';
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
                            <UnauthenticatedRoute path="/admin" component={AdminComponent} />
                            <AuthenticatedRoute path="/home" component={HomeComponent} />
                            <AuthenticatedRoute path="/profile" component={ProfileComponent} />
                            <AuthenticatedRoute path="/cart" component={MyCartComponent} />
                            <AuthenticatedRoute path="/checkout" component={CheckoutComponent} />
                            <AuthenticatedRoute path="/order-confirmation" component={OrderConfirmationComponent} />
                            <AuthenticatedRoute path="/orders" component={OrdersComponent} />
                            <AdminRoute path="/admin-home" component={AdminHomeComponent} />
                            <AdminRoute path="/admin-add-edit" component={AdminAddEditProductComponent} />
                            <AdminRoute path="/admin-orders" component={AdminOrdersComponent} />
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