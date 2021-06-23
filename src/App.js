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
import { ROUTER_LINKS } from "./Router";
import { throwMsg } from "./util";
import { openSnackbar } from "./redux/snackbar/snackbar.actions";
import { getMsgYN } from "./util";

class App extends React.Component {
    render() {
        const { snackbarStatus, openSnackbar } = this.props;
        return (
            <div className='App'>
                <Header />
                <div className='App__page'>
                    <Switch>
                        <Route exact path='/' render={() => <Home />} />
                        <Route exact path={ROUTER_LINKS.signIn} render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignIn />)} />
                        <Route exact path={ROUTER_LINKS.signUp} render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignUp />)} />
                        <Route
                            exact
                            path={ROUTER_LINKS.basket}
                            render={() => (this.props.currentUser ? <Basket /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
                        <Route
                            exact
                            path={ROUTER_LINKS.addProduct}
                            render={() => (this.props.currentUser ? <AddProduct /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
                        <Route exact path={ROUTER_LINKS.navigation} render={() => (this.props.currentUser ? <Navigation /> : <Navigation />)} />
                        <Route
                            exact
                            path={ROUTER_LINKS.search}
                            render={() => (this.props.currentUser ? <Search /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
                        <Route
                            exact
                            path={ROUTER_LINKS.orders}
                            render={() => (this.props.currentUser ? <Orders /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
                        <Route
                            exact
                            path={ROUTER_LINKS.item + ":id"}
                            render={() => (this.props.currentUser ? <Item /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
                        <Route
                            path={ROUTER_LINKS.searchResult + ":id"}
                            render={() => (this.props.currentUser ? <SearchResult /> : <Redirect to={ROUTER_LINKS.signIn} />)}
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
    currentUser: state.shoppingAppUser.currentUser,
    snackbarStatus: state.snackbar,
});

const mapDispatchToProps = (dispatch) => ({
    openSnackbar: (status) => dispatch(openSnackbar(status)),
});

export default connect(mapSateToProps, mapDispatchToProps)(App);
