import React, { Component } from "react";
import GradeSharpIcon from "@material-ui/icons/GradeSharp";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { api } from "../../server";
import { getPopup } from "../../util";
import { withRouter } from "react-router-dom";
import "./ItemDetails.css";

class ItemDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: "",
            selected: {},
            selectable: {},
            units: [],
        };
    }

    handleData = async () => {
        const { match } = this.props;
        let res = {};

        try {
            res = await api.item.detail(match.params.id);
        } catch (e) {}

        const data = [...res.subDetail];
        const newData = {};
        const selected = {};
        const units = [];
        const details = [];
        for (let i = 0; i < data.length; i++) {
            data[i]?.selectable !== undefined &&
                Object.keys(data[i].selectable).forEach((item) => {
                    if (!(item in newData)) newData[item] = [];
                    if (newData[item].indexOf(data[i].selectable[item]) === -1) newData[item].push(data[i].selectable[item]);
                    if (units.indexOf(item) === -1) units.push(item);
                });
            if (i === 0) {
                data[i].selectable !== undefined &&
                    Object.keys(data[i].selectable).forEach((item) => {
                        selected[item] = data[i].selectable[item];
                    });
                selected["price"] = data[i].price;
                selected["stock"] = data[i].stock;
                selected["subID"] = data[i]._id;
            }
        }

        this.setState({
            item: res,
            selectable: newData,
            selected: selected,
            units: units,
        });
    };

    componentDidMount() {
        this.handleData();
    }
    handleUnitChange = (unit, value) => {
        const { selected, item } = this.state;
        let data = Object.assign({}, selected);
        let isFound = false;
        data[unit] = value;
        for (let i = 0; i < item.subDetail.length; i++) {
            let flag = true;
            Object.keys(item.subDetail[i].selectable).forEach((key) => {
                if (data[key] !== item.subDetail[i].selectable[key]) {
                    flag = false;
                    return;
                }
            });
            if (flag) {
                isFound = true;
                data["price"] = item.subDetail[i].price;
                data["stock"] = item.subDetail[i].stock;
                data["subID"] = item.subDetail[i]._id;
                break;
            }
        }
        if (!isFound) {
            data["price"] = "NAN";
            data["stock"] = 0;
            data["subID"] = "";
        }
        this.setState({
            selected: data,
        });
    };

    handleAddToBasket = async () => {
        const { selected } = this.state;
        const { match } = this.props;
        if (selected.price === "NAN") {
            getPopup("error", "Sorry!  This product is currently out of stock");
            return;
        }
        try {
            const res = await api.user.getBasket();
            let flag = false;
            let sendingData = [];
            res.forEach((item) => {
                if (item.itemID === match.params.id && item.subID === selected.subID) {
                    sendingData.push({
                        itemID: item.itemID,
                        subID: item.subID,
                        qty: item.qty + 1,
                    });
                    flag = true;
                } else
                    sendingData.push({
                        itemID: item.itemID,
                        subID: item.subID,
                        qty: item.qty,
                    });
            });
            if (!flag) {
                sendingData.push({
                    itemID: match.params.id,
                    subID: selected.subID,
                    qty: 1,
                });
            }
            await api.user.addToBasket(sendingData);
            getPopup("success", "Successfully added to basket");
        } catch (e) {
            getPopup("error", e?.response?.data?.info);
        }
    };

    render() {
        const { item, selected, selectable, units, details } = this.state;
        return item === "" ? (
            <div>loading</div>
        ) : (
            <div className='item-details'>
                <div className='item-details__add-to-basket-btn' onClick={this.handleAddToBasket}>
                    ADD TO BASKET
                </div>
                <div className='item-details__main'>
                    <div className='item-details__row1'>
                        <h1 className='item-details__name'>{item.name}</h1>
                        <div className='item-details__ratings'>
                            <div>
                                {[...Array(5 - parseInt(item.rate))].map((elementInArray, index) => (
                                    <StarBorderIcon key={item.name + index + elementInArray + 1} style={{ marginLeft: "5px", fontSize: "55px" }} />
                                ))}
                                {[...Array(parseInt(item.rate))].map((elementInArray, index) => (
                                    <GradeSharpIcon key={item.name + index + elementInArray + 2} style={{ marginLeft: "5px", fontSize: "55px" }} />
                                ))}
                            </div>
                            <h4>{item.rateCount} Ratings</h4>
                        </div>
                    </div>
                    <span className='item-details__price'>${selected.price}</span>
                    <h4 className='item-details__tax'>INCLUSIVE OF ALL TAXES</h4>
                    <h1 className='item-details__stock'>{selected.stock > 0 ? "IN STOCK" : "THIS PRODUCT IS CURRENTLY OUT OF STOCK"}</h1>
                </div>
                {units.length > 0 ? (
                    <div className='item-details__selectable'>
                        {units.map((unit, index) => (
                            <div key={unit + index} className='item-details__selectable-unit'>
                                {" "}
                                <h1 className='item-details__unit-name'>{unit}</h1>
                                <div className='item-details__selectable-unit-value-container'>
                                    {selectable[unit].map((unitValue) => (
                                        <div
                                            key={unitValue + index}
                                            className={`item-details__selectable-unit-value ${
                                                selected[unit] === unitValue ? "item-details__selectable-unit-value-active" : ""
                                            }`}
                                            onClick={() => this.handleUnitChange(unit, unitValue)}>
                                            {unitValue}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : null}
                <div className='item-details__description'>
                    <h1 className='item-details__unit-name'>PRODUCT DESCRIPTION</h1>
                    <p>{item.description}</p>
                </div>
                {/* <div className='item-details__description'>
                    <h1 className='item-details__unit-name'>PRODUCT DETAILS</h1>
                  
                    <p className='item-details__detail'>{item.item_detail}</p>
                </div> */}
            </div>
        );
    }
}

export default withRouter(ItemDetails);
