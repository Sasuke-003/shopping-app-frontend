import React from "react";
import { ROUTER_LINKS } from "../../Router";
import { withRouter } from "react-router-dom";
import LockSharpIcon from "@material-ui/icons/LockSharp";
import { connect } from "react-redux";
import "./Navigation.css";

function Navigation({ history, userStatus }) {
    return (
        <div class='navigation'>
            <div class='navigation__home navigation__links-container' onClick={() => history.push(ROUTER_LINKS.home)}>
                {" "}
                <h1 className='navigation__links'>Home</h1>
            </div>
            <div class='navigation__first-row'>
                <div class='navigation__links-container' onClick={() => history.push(ROUTER_LINKS.orders)}>
                    <h1 className='navigation__links'>ORDERS</h1>
                </div>
                <div class='navigation__links-container' onClick={() => history.push(ROUTER_LINKS.basket)}>
                    <h1 className='navigation__links'>BASKET</h1>
                </div>
                <div class='navigation__links-container' onClick={() => history.push(ROUTER_LINKS.search)}>
                    <h1 className='navigation__links'>SEARCH</h1>
                </div>
            </div>
            <div class='navigation__second-row'>
                <div class='navigation__links-container' onClick={() => history.push(ROUTER_LINKS.profile)}>
                    <h1 className='navigation__links'>PROFILE</h1>
                </div>
                {userStatus.isAdmin ? (
                    <div class='navigation__links-container' onClick={() => history.push(ROUTER_LINKS.addProduct)}>
                        <h1 className='navigation__links'>ADD PRODUCT</h1>
                    </div>
                ) : (
                    <div class='navigation__links-container'>
                        <h1 className='navigation__links'>
                            <LockSharpIcon style={{ fontSize: 70 }} />
                        </h1>
                    </div>
                )}
                {userStatus.isAdmin ? (
                    <div class='navigation__links-container' onClick={() => history.push(ROUTER_LINKS.deleteProduct)}>
                        <h1 className='navigation__links'>DELETE PRODUCT</h1>
                    </div>
                ) : (
                    <div class='navigation__links-container'>
                        <h1 className='navigation__links'>
                            <LockSharpIcon style={{ fontSize: 70 }} />
                        </h1>
                    </div>
                )}
            </div>
            <div class='navigation__third-row'>
                {userStatus.isAdmin ? (
                    <div class='navigation__links-container' onClick={() => history.push(ROUTER_LINKS.addBanner)}>
                        <h1 className='navigation__links'>ADD BANNER</h1>
                    </div>
                ) : (
                    <div class='navigation__links-container'>
                        <h1 className='navigation__links'>
                            <LockSharpIcon style={{ fontSize: 70 }} />
                        </h1>
                    </div>
                )}{" "}
                {userStatus.isAdmin ? (
                    <div class='navigation__links-container' onClick={() => history.push(ROUTER_LINKS.addOnSale)}>
                        <h1 className='navigation__links'>ADD ON SALE</h1>
                    </div>
                ) : (
                    <div class='navigation__links-container'>
                        <h1 className='navigation__links'>
                            <LockSharpIcon style={{ fontSize: 70 }} />
                        </h1>
                    </div>
                )}{" "}
                <div class='navigation__links-container'>
                    <h1 className='navigation__links'>
                        <LockSharpIcon style={{ fontSize: 70 }} />
                    </h1>
                </div>
            </div>

            <div class='navigation__fourth-row navigation__links-container'>
                <h1 className='navigation__links'>
                    <LockSharpIcon style={{ fontSize: 70 }} />
                </h1>
            </div>
        </div>
    );
}

const mapSateToProps = (state) => ({
    userStatus: state.userStatus.currentUserStatus,
    userToken: state.userToken,
});

export default connect(mapSateToProps)(withRouter(Navigation));
