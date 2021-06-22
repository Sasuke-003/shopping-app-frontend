import React, { Component } from "react";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import Ratings from "../../Components/Ratings/Ratings";

import "./Orders.css";

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCount: 5,
            totalPrice: 20000,
        };
    }
    render() {
        const { totalCount, totalPrice } = this.state;
        return totalCount === 0 ? (
            <div className='orders__no-items'>
                <SentimentDissatisfiedIcon style={{ marginRight: "15px", fontSize: "70px" }} />
                <h1 className='orders__title-no-items'>MY ORDERS</h1>
            </div>
        ) : (
            <div className='orders'>
                <h1 className='orders__title'>MY orders</h1>

                {[...Array(totalCount)].map((e, index) => (
                    <div key={"orders-item-" + index} className='orders__item-container'>
                        <img
                            className='orders__item-image'
                            src='https://images.unsplash.com/photo-1609419658162-232e83ceb6e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                            alt='cannot load'
                        />
                        <div className='orders__item-detail-container'>
                            <div className='orders__item-name-container'>
                                <h1 className='orders__item-name'>ONE PLUS BULLET WIRELESS Z</h1>
                                <div className='orders__item-rate-container'>
                                    <Ratings />
                                    <h6 className='orders__item-rate-text'>{index % 2 === 0 ? "RATE THIS PRODUCT" : "YOU RATED"}</h6>
                                </div>
                            </div>
                            <h1 className='orders__item-price'>$1000</h1>
                            <h1 className='orders__item-other-details'>color : reverb red</h1>
                            <h1 className='orders__item-other-details'>style name : bullet wireless bass edition</h1>
                            <h1 className='orders__item-other-details'>pattern : earphones</h1>
                            <div className='orders__item-qty-container'>
                                <h1 className='orders__item-qty-title'>Quantity : 2</h1>
                            </div>
                        </div>
                        <div className='orders__remove-btn'>CANCEL ORDER</div>
                    </div>
                ))}
            </div>
        );
    }
}
export default Orders;
