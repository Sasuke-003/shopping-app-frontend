import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header";
import Orders from "./Pages/Orders/Orders";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Basket from "./Pages/Basket/Basket.jsx";
import Navigation from "./Pages/Navigation/Navigation";
import Search from "./Pages/Search/Search";
import Item from "./Pages/Item/Item";
import AddProduct from "./Pages/AddProduct/AddProduct";
import SearchResult from "./Pages/SearchResult/SearchResult";
import AddBanner from "./Pages/AddBanner/AddBanner";
import DeleteProduct from "./Pages/DeleteProduct/DeleteProduct";
import AddOnSale from "./Pages/AddOnSale/AddOnSale";
import Checkout from "./Pages/Checkout/Checkout";
import { ROUTER_LINKS } from "./Router";
import { throwMsg } from "./util";
import { openSnackbar } from "./redux/snackbar/snackbar.actions";
import { getMsgYN } from "./util";

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         primary: "#f1faee",
    //         secondary: "#1d3557",
    //         border: "#457b9d",
    //         borderSecondary: "#a8dadc",
    //     };
    // }
    componentDidMount() {
        const color1 = {
            primary: "#f1faee",
            secondary: "#1d3557",
            border: "#457b9d",
            borderSecondary: "#a8dadc",
        };
        const color2 = {
            primary: "#edf2f4",
            secondary: "#2b2d42",
            border: "#d90429",
            borderSecondary: "#ef233c",
        };
        const color3 = {
            primary: "#f2f2f2",
            secondary: "#040506",
            border: "#7c7c7c",
            borderSecondary: "#7c7c7c",
        };
        const { primary, secondary, border, borderSecondary } = color3;
        document.documentElement.style.setProperty("--primary", primary);
        document.documentElement.style.setProperty("--secondary", secondary);
        document.documentElement.style.setProperty("--border", border);
        document.documentElement.style.setProperty("--borderSecondary", borderSecondary);
    }
    render() {
        const { isLoggedIn, isAdmin } = this.props.userStatus;
        const { snackbarStatus, openSnackbar } = this.props;

        return (
            <div className='App'>
                <Header />
                <div className='App__page'>
                    <Switch>
                        <Route exact path='/' render={() => (isLoggedIn ? <Home /> : <SignIn />)} />
                        <Route exact path={ROUTER_LINKS.signIn} render={() => (isLoggedIn ? <Redirect to='/' /> : <SignIn />)} />
                        <Route exact path={ROUTER_LINKS.signUp} render={() => (isLoggedIn ? <Redirect to='/' /> : <SignUp />)} />
                        <Route exact path={ROUTER_LINKS.basket} render={() => (isLoggedIn ? <Basket /> : <Redirect to={ROUTER_LINKS.signIn} />)} />
                        <Route
                            exact
                            path={ROUTER_LINKS.addProduct}
                            render={() => (isLoggedIn & isAdmin ? <AddProduct /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
                        <Route exact path={ROUTER_LINKS.navigation} render={() => (isLoggedIn ? <Navigation /> : <SignIn />)} />
                        <Route exact path={ROUTER_LINKS.search} render={() => (isLoggedIn ? <Search /> : <Redirect to={ROUTER_LINKS.signIn} />)} />
                        <Route exact path={ROUTER_LINKS.orders} render={() => (isLoggedIn ? <Orders /> : <Redirect to={ROUTER_LINKS.signIn} />)} />
                        <Route
                            exact
                            path={ROUTER_LINKS.deleteProduct}
                            render={() => (isLoggedIn & isAdmin ? <DeleteProduct /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
                        <Route
                            exact
                            path={ROUTER_LINKS.addBanner}
                            render={() => (isLoggedIn & isAdmin ? <AddBanner /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
                        <Route
                            exact
                            path={ROUTER_LINKS.addOnSale}
                            render={() => (isLoggedIn & isAdmin ? <AddOnSale /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
                        <Route
                            exact
                            path={ROUTER_LINKS.checkout}
                            render={() => (isLoggedIn ? <Checkout /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
                        <Route path={ROUTER_LINKS.item + ":id"} render={() => (isLoggedIn ? <Item /> : <Redirect to={ROUTER_LINKS.signIn} />)} />
                        <Route
                            path={ROUTER_LINKS.searchResult + ":id"}
                            render={() => (isLoggedIn ? <SearchResult /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
                    </Switch>
                    {throwMsg(
                        snackbarStatus.open,
                        () => openSnackbar({ open: false, status: "", msg: "" }),
                        snackbarStatus.status,
                        snackbarStatus.msg
                    )}
                    {getMsgYN(snackbarStatus.popupMsg, snackbarStatus.popupYesFunc)}
                </div>
            </div>
        );
    }
}

const mapSateToProps = (state) => ({
    userStatus: state.userStatus.currentUserStatus,
    userToken: state.userToken,
    snackbarStatus: state.snackbar,
});

const mapDispatchToProps = (dispatch) => ({
    openSnackbar: (status) => dispatch(openSnackbar(status)),
});

export default connect(mapSateToProps, mapDispatchToProps)(App);
