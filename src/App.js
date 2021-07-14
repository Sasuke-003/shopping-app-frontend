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
import { api } from "./server";
import { getMsgYN } from "./util";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shopName: "",
        };
    }
    getData = async () => {
        if (process.env.REACT_APP_SHOP_ID === undefined) return;
        try {
            const res = await api.shop.getDetails(process.env.REACT_APP_SHOP_ID);
            document.documentElement.style.setProperty("--primary", res.color.bgc);
            document.documentElement.style.setProperty("--secondary", res.color.tc);
            document.documentElement.style.setProperty("--border", res.color.bc);
            document.documentElement.style.setProperty("--borderSecondary", res.color.bsc);
            this.setState({ shopName: res.name });
        } catch (e) {
            console.log(e);
        }
    };
    componentDidMount() {
        this.getData();
        // const { primary, secondary, border, borderSecondary } = color3;
        // document.documentElement.style.setProperty("--primary", primary);
        // document.documentElement.style.setProperty("--secondary", secondary);
        // document.documentElement.style.setProperty("--border", border);
        // document.documentElement.style.setProperty("--borderSecondary", borderSecondary);
    }

    render() {
        const { isLoggedIn, isAdmin } = this.props.userStatus;
        const { snackbarStatus, openSnackbar } = this.props;

        return (
            <div className='App'>
                <Header shopName={this.state.shopName} />
                <div className='App__page'>
                    <Switch>
                        <Route exact path='/' render={() => (isLoggedIn ? <Home /> : <Redirect to={ROUTER_LINKS.signIn} />)} />
                        <Route exact path={ROUTER_LINKS.signIn} render={() => (isLoggedIn ? <Redirect to='/' /> : <SignIn />)} />
                        <Route exact path={ROUTER_LINKS.signUp} render={() => (isLoggedIn ? <Redirect to='/' /> : <SignUp />)} />
                        <Route exact path={ROUTER_LINKS.basket} render={() => (isLoggedIn ? <Basket /> : <Redirect to={ROUTER_LINKS.signIn} />)} />
                        <Route
                            exact
                            path={ROUTER_LINKS.addProduct}
                            render={() => (isLoggedIn & isAdmin ? <AddProduct /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
                        <Route
                            exact
                            path={ROUTER_LINKS.navigation}
                            render={() => (isLoggedIn ? <Navigation /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
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
                        <Route
                            exact
                            path={ROUTER_LINKS.item + ":id"}
                            render={() => (isLoggedIn ? <Item /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                        />
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
