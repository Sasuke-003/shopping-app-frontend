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
import { ROUTER_LINKS } from "./Router";

class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <Header />
                <Switch>
                    <Route exact path='/' render={() => <Home />} />
                    <Route exact path={ROUTER_LINKS.signIn} render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignIn />)} />
                    <Route exact path={ROUTER_LINKS.signUp} render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignUp />)} />
                    <Route
                        exact
                        path={ROUTER_LINKS.basket}
                        render={() => (this.props.currentUser ? <Basket /> : <Redirect to={ROUTER_LINKS.signIn} />)}
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
                        path={ROUTER_LINKS.item}
                        render={() => (this.props.currentUser ? <Item /> : <Redirect to={ROUTER_LINKS.signIn} />)}
                    />
                </Switch>
            </div>
        );
    }
}

const mapSateToProps = (state) => ({
    currentUser: state.shoppingAppUser.currentUser,
});

export default connect(mapSateToProps)(App);
