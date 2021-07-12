import React, { Component } from "react";
import { HorizontalDragScrollEnable, SERVER_URL } from "../../util";
import GradeSharpIcon from "@material-ui/icons/GradeSharp";
import { ROUTER_LINKS } from "../../Router";
import { withRouter } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./ProductHomeView.css";

class ProductHomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isStarted: false,
        };
    }
    getData = async () => {
        if (!this.props.url) return;
        try {
            const res = await axios.get(this.props.url);
            let datas = [...res];
            datas.forEach((data) => {
                data["price"] = data.itemObj.subDetail[0].price;
            });

            this.setState({ products: datas, isStarted: true });
        } catch (e) {
            console.log(e);
            this.setState({ isStarted: true });
        }
    };

    componentDidMount() {
        this.getData();
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
        const { products, isStarted } = this.state;
        const { history } = this.props;
        return !isStarted ? (
            <div className={`product-home-view drag-scroll-${this.props.classKey}`}>
                <CircularProgress size='45px' />
            </div>
        ) : (
            <div className={`product-home-view drag-scroll-${this.props.classKey}`}>
                {products.map((product, index) => (
                    <div key={product.itemObj.name + index} id={product + index} className='product-home-view__container'>
                        <span className='product-home-view__name'>
                            {product.itemObj.name.length > 23 ? product.itemObj.name.slice(0, 23) + "..." : product.itemObj.name}
                        </span>
                        <img
                            className='product-home-view__image'
                            id='product-home-view__image'
                            src={SERVER_URL + "item/" + product.itemObj.img[0]}
                            alt='Cannot load'
                        />
                        <div className='product-home-view__image-hover'>
                            <div className='product-home-view__btn' onClick={() => history.push(ROUTER_LINKS.item + product.itemID)}>
                                VIEW PRODUCT
                            </div>
                        </div>
                        <div className='product-home-view__bottom'>
                            <span className='product-home-view__price'>
                                {product.offer === 0 ? null : <span className='product-home-view__price-strike'>${product.price}</span>}$
                                {(product.price * (100 - product.offer)) / 100}
                            </span>
                            <div className='product-home-view__ratings'>
                                {[...Array(product.rate)].map((elementInArray, index) => (
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
