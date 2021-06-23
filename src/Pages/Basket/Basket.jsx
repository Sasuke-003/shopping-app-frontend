import React, { Component } from "react";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import "./Basket.css";
import { openMyPopup } from "../../util";

class Basket extends Component {
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
            <div className='basket__no-items'>
                <SentimentDissatisfiedIcon style={{ marginRight: "15px", fontSize: "70px" }} />
                <h1 className='basket__title-no-items'>Your Basket is empty</h1>
            </div>
        ) : (
            <div className='basket'>
                <div className='basket__place-order-btn'>
                    PLACE ORDER
                    <br />
                    <span>
                        ITEMS ({totalCount}) : ${totalPrice}
                    </span>
                </div>
                <h1 className='basket__title'>MY BASKET</h1>

                {[...Array(totalCount)].map((e, index) => (
                    <div key={"basket-item-" + index} className='basket__item-container'>
                        <img
                            className='basket__item-image'
                            src='https://images.unsplash.com/photo-1609419658162-232e83ceb6e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                            alt='cannot load'
                        />
                        <div className='basket__item-detail-container'>
                            <div className='basket__item-name-container'>
                                <h1 className='basket__item-name'>ONE PLUS BULLET WIRELESS Z</h1>
                                <h1 className='basket__item-name'>$2000</h1>
                            </div>
                            <h1 className='basket__item-price'>$1000</h1>
                            <h1 className='basket__item-other-details'>color : reverb red</h1>
                            <h1 className='basket__item-other-details'>style name : bullet wireless bass edition</h1>
                            <h1 className='basket__item-other-details'>pattern : earphones</h1>
                            <div className='basket__item-qty-container'>
                                <h1 className='basket__item-qty-title'>Quantity : </h1>
                                <select className='basket__item-qty-select' name='cars' id='cars'>
                                    {[...Array(9)].map((elementInArray, index) => (
                                        <option key={"item-qty-select" + index} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div
                            className='basket__remove-btn'
                            onClick={() => openMyPopup("Are you sure you want to remove this product from the basket?", () => alert("hmm"))}>
                            REMOVE FROM BASKET
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
export default Basket;
