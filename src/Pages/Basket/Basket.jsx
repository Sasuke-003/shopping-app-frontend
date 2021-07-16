import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import "./Basket.css";
import { api } from "../../server";
import { ROUTER_LINKS } from "../../Router";
import { openMyPopup, SERVER_URL, getPopup } from "../../util";
import CircularProgress from "@material-ui/core/CircularProgress";
class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            totalPrice: 0,
            totalItems: 0,
            isStarted: false,
        };
    }
    getData = async () => {
        try {
            let totalPrice = 0;
            let totalItems = 0;
            const res = await api.user.getBasket();
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
            this.setState({ items: datas, totalPrice: totalPrice, totalItems: totalItems, isStarted: true });
        } catch (e) {
            console.log(e);
            this.setState({ isStarted: true });
        }
    };

    onSelectChange = async (e, itemID, subID) => {
        try {
            let items = [...this.state.items];
            let sendingData = [];
            let totalPrice = Number.parseInt(this.state.totalPrice);
            let totalItems = Number.parseInt(this.state.totalItems);

            items.forEach((item) => {
                if (itemID === item.itemID && item.subID === subID) {
                    totalPrice -= item.price * item.qty;
                    totalPrice += item.price * e.target.value;
                    totalItems -= item.qty - e.target.value;

                    item["qty"] = e.target.value;
                }
                sendingData.push({
                    itemID: item.itemID,
                    subID: item.subID,
                    qty: item.qty,
                });
            });
            await api.user.addToBasket(sendingData);
            getPopup("success", "Quantity updated");
            this.setState({ items: items, totalPrice: totalPrice, totalItems: totalItems });
        } catch (e) {
            // console.log(e);
            getPopup("error", e?.response?.data?.info);
        }
    };

    handleDeleteItem = async (itemID, subID) => {
        try {
            let items = [...this.state.items];
            let sendingData = [];
            let totalPrice = Number.parseInt(this.state.totalPrice);
            let totalItems = Number.parseInt(this.state.totalItems);
            items = items.filter((item) => {
                if (itemID !== item.itemID || item.subID !== subID) {
                    sendingData.push({
                        itemID: item.itemID,
                        subID: item.subID,
                        qty: item.qty,
                    });
                    return item;
                }
                totalPrice -= item.price * item.qty;
                totalItems -= item.qty;
            });

            await api.user.addToBasket(sendingData);
            getPopup("success", "Deleted successfully");
            this.setState({ items: items, totalPrice: totalPrice, totalItems: totalItems });
        } catch (e) {
            // console.log(e);
            getPopup("error", e?.response?.data?.info);
        }
    };

    componentDidMount() {
        this.getData();
    }

    render() {
        const { items, totalPrice, totalItems, isStarted } = this.state;
        const { history } = this.props;
        return !isStarted ? (
            <div className='search-result__isSearching'>
                <CircularProgress size='45px' />
            </div>
        ) : items.length === 0 ? (
            <div className='basket__no-items'>
                <SentimentDissatisfiedIcon style={{ marginRight: "15px", fontSize: "70px" }} />
                <h1 className='basket__title-no-items'>Your Basket is empty</h1>
            </div>
        ) : (
            <div className='basket'>
                <div className='basket__place-order-btn' onClick={() => history.push(ROUTER_LINKS.checkout)}>
                    PLACE ORDER
                    <br />
                    <span>
                        ITEMS ({totalItems}) : ${totalPrice}
                    </span>
                </div>
                <h1 className='basket__title'>MY BASKET</h1>

                {items.map((item, index) => (
                    <div key={"basket-item-" + index} className='basket__item-container'>
                        <img className='basket__item-image' src={SERVER_URL + "item/" + item.img} alt='cannot load' />
                        <div className='basket__item-detail-container'>
                            <div className='basket__item-name-container'>
                                <h1 className='basket__item-name'>{item.name}</h1>
                                <h1 className='basket__item-name'>${item.price * item.qty}</h1>
                            </div>
                            <h1 className='basket__item-price'>${item.price}</h1>
                            {item.selectable.map((selectable) => (
                                <h1 className='basket__item-other-details'>{selectable}</h1>
                            ))}

                            <div className='basket__item-qty-container'>
                                <h1 className='basket__item-qty-title'>Quantity : </h1>
                                <select
                                    className='basket__item-qty-select'
                                    name='cars'
                                    id='cars'
                                    value={item.qty}
                                    onChange={(e) => this.onSelectChange(e, item.itemID, item.subID)}>
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
                            onClick={() =>
                                openMyPopup("Are you sure you want to remove " + item.name + " from the basket?", () =>
                                    this.handleDeleteItem(item.itemID, item.subID)
                                )
                            }>
                            REMOVE FROM BASKET
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default withRouter(Basket);
