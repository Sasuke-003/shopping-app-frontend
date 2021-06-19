import React, { Component } from "react";
import { HorizontalDragScrollEnable } from "../../util";
import GradeSharpIcon from "@material-ui/icons/GradeSharp";

import "./ProductHomeView.css";

export default class ProductHomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    name: "WOODEN GROOT",
                    imageUrl:
                        "https://images.unsplash.com/photo-1609419658162-232e83ceb6e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                    price: 250,
                    ratings: 5,
                },

                {
                    name: "RAYMONDS",
                    imageUrl:
                        "https://images.unsplash.com/photo-1602810319250-a663f0af2f75?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                    price: 250,
                    ratings: 4,
                },
                {
                    name: "SCULLERS DENIM",
                    imageUrl:
                        "https://images.unsplash.com/photo-1603202577997-003d15cfc20b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=738&q=80",
                    price: 250,
                    ratings: 5,
                },
                {
                    name: "BEATS II",
                    imageUrl:
                        "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                    price: 250,
                    ratings: 4,
                },
                {
                    name: "MILTON JAR",
                    imageUrl:
                        "https://images.unsplash.com/photo-1565620731358-e8c038abc8d1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80",
                    price: 250,
                    ratings: 4,
                },
                {
                    name: "WITCHER",
                    imageUrl:
                        "https://images.unsplash.com/photo-1513001900722-370f803f498d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                    price: 250,
                    ratings: 3,
                },
                {
                    name: "PS5 CONTROLLER",
                    imageUrl:
                        "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                    price: 250,
                    ratings: 5,
                },
                {
                    name: "XBOX CONTROLLER",
                    imageUrl:
                        "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1047&q=80",
                    price: 250,
                    ratings: 4,
                },
                {
                    name: "NIKE CASUALS",
                    imageUrl:
                        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=658&q=80",
                    price: 250,
                    ratings: 2,
                },
            ],
        };
    }

    componentDidMount() {
        HorizontalDragScrollEnable(`drag-scroll-${this.props.classKey}`);
    }

    render() {
        const { products } = this.state;
        return (
            <div className={`product-home-view drag-scroll-${this.props.classKey}`}>
                {products.map((product, index) => (
                    <div id={product + index} className='product-home-view__container'>
                        <span className='product-home-view__name'>{product.name}</span>
                        <img className='product-home-view__image' src={product.imageUrl} alt='cannot load' />
                        <div className='product-home-view__bottom'>
                            <span className='product-home-view__price'>
                                <span className='product-home-view__price-strike'>${product.price + 100}</span>${product.price}
                            </span>
                            <div className='product-home-view__ratings'>
                                {[...Array(product.ratings)].map((elementInArray, index) => (
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
