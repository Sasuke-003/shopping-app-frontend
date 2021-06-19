import { ROUTER_LINKS } from "../../Router";
import { withRouter } from "react-router-dom";
import "./Header.css";

import MenuSharpIcon from "@material-ui/icons/MenuSharp";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import ShoppingBasketSharpIcon from "@material-ui/icons/ShoppingBasketSharp";

function Header({ history }) {
    return (
        <div className='header'>
            {console.log(history)}
            <h1 className='header__title' onClick={() => history.push(ROUTER_LINKS.home)}>
                MY SHOP
            </h1>
            <div className='header__menu-icon'>
                <div className='header__menu-icon-container' onClick={() => history.push(ROUTER_LINKS.navigation)}>
                    <MenuSharpIcon style={{ fontSize: 70 }} />
                </div>
            </div>
            <div className='header__extra-icons'>
                <div className='header__search-icon' onClick={() => history.push(ROUTER_LINKS.search)}>
                    <SearchSharpIcon style={{ fontSize: 40 }} />
                </div>
                <div className='header__basket-icon' onClick={() => history.push(ROUTER_LINKS.basket)}>
                    <ShoppingBasketSharpIcon style={{ fontSize: 40 }} />
                </div>
            </div>
        </div>
    );
}

export default withRouter(Header);
