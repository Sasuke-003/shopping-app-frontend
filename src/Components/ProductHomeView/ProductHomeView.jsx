import React, { Component } from "react";
import { HorizontalDragScrollEnable, SERVER_URL } from "../../util";
import GradeSharpIcon from "@material-ui/icons/GradeSharp";
import { ROUTER_LINKS } from "../../Router";
import { withRouter, Link } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import "./ProductHomeView.css";

class ProductHomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // getData = async () => {
    //     if (!this.props.url) return;
    //     try {
    //         const res = await axios.get(this.props.url);
    //         let datas = [...res];
    //         datas.forEach((data) => {
    //             data["price"] = data.itemObj.subDetail[0].price;
    //         });

    //         this.setState({ products: datas, isStarted: true });
    //     } catch (e) {
    //         console.log(e);
    //         this.setState({ isStarted: true });
    //     }
    // };

    componentDidMount() {
        // this.getData();
        HorizontalDragScrollEnable(`drag-scroll-${this.props.classKey}`);
    }

    // handleClick = (name) => {
    //     const { history } = this.props;
    //     let drag = false;
    //     document.addEventListener("mousedown", () => (drag = false));
    //     document.addEventListener("mousemove", () => (drag = true));
    //     document.addEventListener("mouseup1", () => {
    //         if (!drag) history.push(ROUTER_LINKS.item + name);
    //     });
    // };

    render() {
        const { history, products = [], isStarted = false } = this.props;
        return !isStarted ? (
            <div className={`product-home-view drag-scroll-${this.props.classKey}`}>
                <CircularProgress size='45px' />
            </div>
        ) : (
            <div className={`product-home-view drag-scroll-${this.props.classKey}`}>
                {console.log(products)}
                {products.length > 0 &&
                    products.map((product, index) => (
                        <div key={product.itemObj.name + index} id={product + index} className='product-home-view__container'>
                            <span className='product-home-view__name'>
                                {product.itemObj.name.length > 23 ? product.itemObj.name.slice(0, 23) + "..." : product.itemObj.name}
                            </span>
                            <img
                                loading='lazy'
                                className='product-home-view__image'
                                id='product-home-view__image'
                                src={SERVER_URL + "item/" + product.itemObj.img[0]}
                                alt='Cannot load'
                            />
                            <div className='product-home-view__image-hover'>
                                <Link to={ROUTER_LINKS.item + product.itemID}>
                                    <div className='product-home-view__btn'>VIEW PRODUCT</div>
                                </Link>
                            </div>
                            <div className='product-home-view__bottom'>
                                <span className='product-home-view__price'>
                                    {product.offer === 0 ? null : <span className='product-home-view__price-strike'>${product.price}</span>}$
                                    {(product.price * (100 - product.offer)) / 100}
                                </span>
                                {console.log("........................................................................")}
                                {console.log(product)}
                                <div className='product-home-view__ratings'>
                                    {[...Array(parseInt(product.rate))].map((elementInArray, index) => (
                                        <GradeSharpIcon key={product + index + elementInArray} style={{ marginLeft: "5px", fontSize: "23px" }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        );
    }
}

export default withRouter(ProductHomeView);
