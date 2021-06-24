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
import { ROUTER_LINKS } from "./Router";
import { throwMsg } from "./util";
import { openSnackbar } from "./redux/snackbar/snackbar.actions";
import { getMsgYN } from "./util";

class App extends React.Component {
    render() {
        const { isLoggedIn } = this.props.userStatus;
        const { snackbarStatus, openSnackbar } = this.props;
        return (
            <div className='App'>
                <Header />
                <div className='App__page'>
                    <Switch>
                        <Route exact path='/' render={() => <Home />} />
                        <Route exact path={ROUTER_LINKS.signIn} render={() => (isLoggedIn ? <Redirect to='/' /> : <SignIn />)} />
                        <Route exact path={ROUTER_LINKS.signUp} render={() => (isLoggedIn ? <Redirect to='/' /> : <SignUp />)} />
                        <Route exact path={ROUTER_LINKS.basket} render={() => (isLoggedIn ? <Basket /> : <Redirect to={ROUTER_LINKS.signIn} />)} />
                        <Route
                            exact
                            path={ROUTER_LINKS.addProduct}
                            render={() => (isLoggedIn ? <AddProduct /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
                        <Route exact path={ROUTER_LINKS.navigation} render={() => (isLoggedIn ? <Navigation /> : <Navigation />)} />
                        <Route exact path={ROUTER_LINKS.search} render={() => (isLoggedIn ? <Search /> : <Redirect to={ROUTER_LINKS.signIn} />)} />
                        <Route exact path={ROUTER_LINKS.orders} render={() => (isLoggedIn ? <Orders /> : <Redirect to={ROUTER_LINKS.signIn} />)} />
                        <Route
                            exact
                            path={ROUTER_LINKS.deleteProduct}
                            render={() => (isLoggedIn ? <DeleteProduct /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
                        <Route
                            exact
                            path={ROUTER_LINKS.addBanner}
                            render={() => (isLoggedIn ? <AddBanner /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
                        <Route
                            exact
                            path={ROUTER_LINKS.addOnSale}
                            render={() => (isLoggedIn ? <AddOnSale /> : <Redirect to={ROUTER_LINKS.signIn} />)}
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
