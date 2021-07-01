import React, { Component } from "react";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import Ratings from "../../Components/Ratings/Ratings";
import OrderStepper from "../../Components/OrderStepper/OrderStepper";
// import Popup from "../../Components/Popup/Popup";
import { openMyPopup, getPopup, SERVER_URL } from "../../util";
import { api } from "../../server";
import { connect } from "react-redux";
import "./Orders.css";

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            totalPrice: 0,
            totalItems: 0,
        };
    }
    getData = async () => {
        try {
            let totalPrice = 0;
            let totalItems = 0;
            const res = await api.order.list();
            let datas = [...res];
            datas.forEach((data) => {
                data.itemObj.subDetail.forEach((element) => {
                    if (element._id === data.subID) {
                        let selectable = [];
                        Object.keys(element.selectable).forEach((key) => {
                            selectable.push(key + " : " + element.selectable[key]);
                        });
                        // totalPrice += ((element.price * (100 - data.offer))/100;
                        let discountPrice = (element.price * (100 - data?.offer)) / 100;
                        totalPrice += discountPrice * data.qty;
                        totalItems += data.qty;
                        data["price"] = discountPrice;
                        data["selectable"] = selectable;
                    }
                });
                data["img"] = data.itemObj.img[0];
                data["name"] = data.itemObj.name;
            });
            this.setState({ items: datas, totalPrice: totalPrice, totalItems: totalItems });
        } catch (e) {
            console.log(e);
        }
    };

    handleCancelOrder = async (orderID) => {
        try {
            await api.order.delete({ orderID });
            let datas = [...this.state.items];
            datas.forEach((data) => {
                if (data.orderID === orderID) data["status"] = 0;
            });
            this.state({ items: datas });
            getPopup("success", "Successfully canceled your order");
        } catch (e) {
            getPopup("error", e?.response?.data?.info);
        }
    };

    submitRating = async (rate, orderID) => {
        try {
            await api.order.rate({ orderID, rate });
            let datas = [...this.state.items];
            datas.forEach((data) => {
                if (data.orderID === orderID) data["userRating"] = rate;
            });
            this.state({ items: datas });
            getPopup("success", "Successfully canceled your order");
        } catch (e) {
            getPopup("error", e?.response?.data?.info);
        }
    };

    componentDidMount() {
        this.getData();
    }
    render() {
        const { totalItems, totalPrice, open, items } = this.state;
        // const { snackbarStatus } = this.props;
        return totalItems === 0 ? (
            <div className='orders__no-items'>
                <SentimentDissatisfiedIcon style={{ marginRight: "15px", fontSize: "70px" }} />
                <h1 className='orders__title-no-items'>MY ORDERS</h1>
            </div>
        ) : (
            <div className='orders'>
                <h1 className='orders__title'>MY orders</h1>

                {items.map((item, index) => (
                    <div key={"orders-item-" + index} className='orders__item-container-main'>
                        <div className='orders__item-container'>
                            <img className='orders__item-image' src={SERVER_URL + "item/" + item.img} alt='cannot load' />
                            <div className='orders__item-detail-container'>
                                <div className='orders__item-name-container'>
                                    <h1 className='orders__item-name'>{item.name}</h1>
                                    <div className='orders__item-rate-container'>
                                        <Ratings orderID={item.orderID} rating={item.userRating} getRating={this.submitRating} />
                                        <h6 className='orders__item-rate-text'>{item.userRating < 1 ? "RATE THIS PRODUCT" : "YOU RATED"}</h6>
                                    </div>
                                </div>
                                <h1 className='orders__item-price'>${item.price}</h1>
                                {item.selectable.map((selectable) => (
                                    <h1 className='orders__item-other-details'>{selectable}</h1>
                                ))}
                                <div className='orders__item-qty-container'>
                                    <h1 className='orders__item-qty-title'>Quantity : {item.qty}</h1>
                                </div>
                            </div>

                            <div className='orders__remove-btn' onClick={() => openMyPopup("hello", () => this.handleCancelOrder(item.orderID))}>
                                CANCEL ORDER
                            </div>
                        </div>
                        <OrderStepper step={item.status} />
                    </div>
                ))}
                {/* <Popup>
                    <div className='orders__popup'>
                        <div className='orders__popup-msg'>
                            are you sure you want to cancel this order?
                        </div>
                        <div className='orders__popup-buttons'>
                            <div className='orders__popup-btn'>NO</div>
                            <div className='orders__popup-btn'>YES</div>
                        </div>
                    </div>
                </Popup>  */}
            </div>
        );
    }
}

// const mapSateToProps = (state) => ({
//     snackbarStatus: state.snackbar,
// });

// export default connect(mapSateToProps)(Orders);
export default Orders;
