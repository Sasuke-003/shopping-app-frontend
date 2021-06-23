import React, { Component } from "react";
import GradeSharpIcon from "@material-ui/icons/GradeSharp";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "./ItemDetails.css";

class ItemDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                name: "OnePlus Bullets Wireless Z Bass Edition",
                rating: 3,
                noOfRatings: 2532,
                sub_detail: [
                    {
                        price: 1999,
                        inStock: true,
                        selectable: {
                            Color: "Reverb Red",
                            "Style name": "BWZ-Bass Edition",
                            "Pattern name": "Earphones",
                        },
                    },
                    {
                        price: 1500,
                        inStock: true,
                        selectable: {
                            Color: "Base Blue",
                            "Style name": "BWZ",
                            "Pattern name": "Earphones",
                        },
                    },
                    {
                        price: 1500,
                        inStock: true,
                        selectable: {
                            Color: "Reverb Blue",
                            "Style name": "BWZ",
                            "Pattern name": "Earphones",
                        },
                    },
                ],
                item_desc:
                    " The Bass Edition comes equipped Sweat Resistance Warp Charge: Charge for 10 min playback.The Bass Edition comes equipped Sweat Resistance. The Bass Edition comes equipped Sweat Resistance Warp Charge: Charge for 10 min playback.The Bass Edition comes equipped Sweat Resistance. The Bass Edition comes equipped Sweat Resistance Warp Charge: Charge for 10 min playback.The Bass Edition comes equipped Sweat Resistance. The Bass Edition comes equipped Sweat Resistance Warp Charge: Charge for 10 min playback.The Bass Edition comes equipped Sweat Resistance. The Bass Edition comes equipped Sweat Resistance Warp Charge: Charge for 10 min playback.The Bass Edition comes equipped Sweat Resistance. The Bass Edition comes equipped Sweat Resistance Warp Charge: Charge for 10 min playback.The Bass Edition comes equipped Sweat Resistance. ",
            },
            selected: {},
            selectable: {},
            units: [],
        };
    }

    componentDidMount() {
        const { item } = this.state;
        const data = [...item.sub_detail];
        const newData = {};
        const selected = {};
        const units = [];
        const details = [];
        for (let i = 0; i < data.length; i++) {
            Object.keys(data[i].selectable).forEach((item) => {
                if (!(item in newData)) newData[item] = [];
                if (newData[item].indexOf(data[i].selectable[item]) === -1) newData[item].push(data[i].selectable[item]);
                if (units.indexOf(item) === -1) units.push(item);
            });
            if (i === 0) {
                Object.keys(data[i].selectable).forEach((item) => {
                    selected[item] = data[i].selectable[item];
                });
                selected["price"] = data[i].price;
                selected["inStock"] = data[i].inStock;
            }
        }

        this.setState({
            selectable: newData,
            selected: selected,
            units: units,
        });
    }

    handleUnitChange = (unit, value) => {
        const { selected, item } = this.state;
        let data = Object.assign({}, selected);
        let isFound = false;
        data[unit] = value;
        for (let i = 0; i < item.sub_detail.length; i++) {
            let flag = true;
            Object.keys(item.sub_detail[i].selectable).forEach((key) => {
                if (data[key] !== item.sub_detail[i].selectable[key]) {
                    flag = false;
                    return;
                }
            });
            if (flag) {
                isFound = true;
                data["price"] = item.sub_detail[i].price;
                data["inStock"] = item.sub_detail[i].inStock;
                break;
            }
        }
        if (!isFound) {
            data["price"] = "NAN";
            data["inStock"] = false;
        }
        this.setState({
            selected: data,
        });
    };

    render() {
        const { item, selected, selectable, units, details } = this.state;
        return (
            <div className='item-details'>
                <div className='item-details__add-to-basket-btn'>ADD TO BASKET</div>
                <div className='item-details__main'>
                    <div className='item-details__row1'>
                        <h1 className='item-details__name'>{item.name}</h1>
                        <div className='item-details__ratings'>
                            <div>
                                {[...Array(5 - item.rating)].map((elementInArray, index) => (
                                    <StarBorderIcon key={item.name + index + elementInArray + 1} style={{ marginLeft: "5px", fontSize: "55px" }} />
                                ))}
                                {[...Array(item.rating)].map((elementInArray, index) => (
                                    <GradeSharpIcon key={item.name + index + elementInArray + 2} style={{ marginLeft: "5px", fontSize: "55px" }} />
                                ))}
                            </div>
                            <h4>{item.noOfRatings} Ratings</h4>
                        </div>
                    </div>
                    <span className='item-details__price'>${selected.price}</span>
                    <h4 className='item-details__tax'>INCLUSIVE OF ALL TAXES</h4>
                    <h1 className='item-details__stock'>{selected.inStock ? "IN STOCK" : "THIS PRODUCT IS CURRENTLY OUT OF STOCK"}</h1>
                </div>
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
                <div className='item-details__description'>
                    <h1 className='item-details__unit-name'>PRODUCT DESCRIPTION</h1>
                    <p>{item.item_desc}</p>
                </div>
                {/* <div className='item-details__description'>
                    <h1 className='item-details__unit-name'>PRODUCT DETAILS</h1>
                  
                    <p className='item-details__detail'>{item.item_detail}</p>
                </div> */}
            </div>
        );
    }
}

export default ItemDetails;
