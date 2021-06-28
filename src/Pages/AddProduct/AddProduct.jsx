import React, { Component } from "react";
import "./AddProduct.css";
import ClearSharpIcon from "@material-ui/icons/ClearSharp";
import ImageUploader from "../../Components/ImageUploader/ImageUploader";
import { api } from "../../server";

let timerID;
const timeOutValue = 500;
let sellerDataSet = new Set();
class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                name: "",
                category: "",
                subDetail: [],
                description: "",
            },
            selectable: [],
            temp: "",
            currentPrdct: "",
            nameAutoComplete: [],
            categoryAutoComplete: [],
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const tempProduct = Object.assign({}, this.state.product);
        tempProduct[name] = value;
        this.setState({
            product: tempProduct,
        });
    };

    componentDidMount() {
        // if (this.state.product?.subDetail?.selectable) {
        this.handleData();
        // }
    }

    handleData = () => {
        const { product } = this.state;
        const data = [...product.subDetail];
        const units = [];
        let currentPrdct = "";
        for (let i = 0; i < data.length; i++) {
            Object.keys(data[i].selectable).forEach((item) => {
                if (units.indexOf(item) === -1) units.push(item);
            });
            data[i]["id"] = Date.now() + i; /////////////*************
            if (i === 0) currentPrdct = data[i]?.id;
        }

        this.setState({
            selectable: units,
            currentPrdct: currentPrdct,
        });
    };

    handleSelectableAdd = () => {
        if (this.state.temp === "") return;
        let tempSelectable = [...this.state.selectable];
        if (tempSelectable.indexOf(this.state.temp) !== -1) return;
        tempSelectable.push(this.state.temp);
        let tempsubDetail = [...this.state.product.subDetail];
        tempsubDetail.forEach((obj) => {
            if (!(this.state.temp in obj.selectable)) obj.selectable[this.state.temp] = "";
        });
        const tempProduct = Object.assign({}, this.state.product);
        tempProduct["subDetail"] = tempsubDetail;
        this.setState({ selectable: tempSelectable, temp: "", product: tempProduct });
    };

    handleSelectableDelete = (value) => {
        let selectable = [...this.state.selectable];
        selectable = selectable.filter(function (el, index, arr) {
            return el !== value;
        });
        let tempsubDetail = [...this.state.product.subDetail];
        tempsubDetail.forEach((obj) => {
            delete obj.selectable[value];
        });
        const tempProduct = Object.assign({}, this.state.product);
        tempProduct["subDetail"] = tempsubDetail;
        this.setState({ selectable: selectable, temp: "", product: tempProduct });
    };

    handleSelectableEditChange = (e, id, isPrice) => {
        const { name, value } = e.target;
        let tempsubDetail = [...this.state.product.subDetail];

        tempsubDetail.forEach((obj) => {
            if (obj.id === id) {
                if (isPrice) {
                    obj[name] = value;
                } else {
                    obj.selectable[name] = value;
                }
                return;
            }
        });
        const tempProduct = Object.assign({}, this.state.product);
        tempProduct["subDetail"] = tempsubDetail;
        this.setState({ product: tempProduct });
    };

    handleStockDelete = (id) => {
        let subDetail = [...this.state.product.subDetail];
        subDetail = subDetail.filter(function (el, index, arr) {
            return el.id !== id;
        });

        const tempProduct = Object.assign({}, this.state.product);
        tempProduct["subDetail"] = subDetail;
        // const crId = subDetail.length > 0 ? subDetail[0].id : "";

        this.setState({ currentPrdct: subDetail[0]?.id, product: tempProduct });
    };

    handleStockAdd = () => {
        let subDetail = [...this.state.product.subDetail];
        if (subDetail.length > 9) return;
        let data = {
            id: Date.now(),
            stock: 0,
            price: 0,
            selectable: {},
        };
        this.state.selectable.forEach((s) => {
            data.selectable[s] = "";
        });
        subDetail.push(data);
        const tempProduct = Object.assign({}, this.state.product);
        tempProduct["subDetail"] = subDetail;
        // const crId = subDetail.length > 0 ? subDetail[0].id : "";

        this.setState({ currentPrdct: data.id, product: tempProduct });
    };

    handleAutoComplete = async (event) => {
        const { name, value } = event.target;
        this.handleChange(event);
        console.log(value);
        if (timerID) clearTimeout(timerID);

        timerID = setTimeout(async () => {
            timerID = undefined;
            const searchData = value;

            if (searchData !== "") {
                if (name === "name") {
                    const res = await api.item.autoComplete(searchData);
                    this.setState({ nameAutoComplete: res });
                }
                if (name === "category") {
                    const res = await api.item.categoryAutoComplete(searchData);
                    this.setState({ categoryAutoComplete: res });
                }
            }
        }, timeOutValue);
    };

    render() {
        const { product, selectable, temp, currentPrdct, nameAutoComplete, categoryAutoComplete } = this.state;
        return (
            <div className='add-product'>
                <h1 className='orders__title'>ADD PRODUCT</h1>
                <div className='add-product__basic-details'>
                    <div className='add-product__name-container'>
                        <div className='add-product__input-container'>
                            {" "}
                            <h3 className='add-product__basic-title'>NAME</h3>{" "}
                            <input
                                className='add-product__name-input'
                                type='text'
                                name='name'
                                value={product.name}
                                onChange={(e) => this.handleAutoComplete(e)}
                                placeholder='type something....'
                                list='name-auto-complete'
                            />
                            <datalist id='name-auto-complete'>
                                {nameAutoComplete.map((option, index) => (
                                    <option key={option.name + index} value={option} />
                                ))}
                            </datalist>
                        </div>
                        <div className='add-product__input-container'>
                            {" "}
                            <h3 className='add-product__basic-title'>CATEGORY</h3>{" "}
                            <input
                                className='add-product__name-input'
                                type='text'
                                name='category'
                                value={product.category}
                                onChange={(e) => this.handleAutoComplete(e)}
                                placeholder='type something....'
                                list='category-auto-complete'
                            />
                            <datalist id='category-auto-complete'>
                                {categoryAutoComplete.map((option, index) => (
                                    <option key={option + index} value={option} />
                                ))}
                            </datalist>
                        </div>
                        <div className='add-product__input-container'>
                            {" "}
                            <h3 className='add-product__basic-title'>ITEM DESCRIPTION</h3> ​
                            <textarea
                                className='add-product__name-input'
                                type='textarea'
                                name='description'
                                value={product.description}
                                onChange={this.handleChange}
                                placeholder='type something....'
                                id='txtArea'
                                rows='10'
                                cols='70'
                            />
                        </div>
                    </div>
                    <div className='add-product__selectable-container'>
                        <div className='add-product__selectable-name'>
                            <h3 className='add-product__selectable-title add-product__basic-title'>SELECTABLE</h3>{" "}
                            {selectable.length >= 10 ? null : (
                                <div className='add-product__selectable-input'>
                                    <input
                                        className='add-product__name-input'
                                        type='text'
                                        value={temp}
                                        onChange={(e) => this.setState({ temp: e.target.value })}
                                        placeholder='type something....'
                                    />
                                    <div className='add-product__selectable-add-btn' onClick={this.handleSelectableAdd}>
                                        ADD
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='add-product__selectable'>
                            {selectable.map((unitValue) => (
                                <div key={unitValue} className='add-product__selectable-value'>
                                    {unitValue}
                                    <ClearSharpIcon onClick={() => this.handleSelectableDelete(unitValue)} style={{ cursor: "pointer" }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='add-product__stock-container'>
                    <div className='add-product__stock-item'>
                        {product.subDetail.map((prdct, index) =>
                            currentPrdct === prdct.id ? (
                                <div key={prdct.id} className='add-product__stock-selectable'>
                                    <div className='add-product__stock-title-container'>
                                        <h3 className='add-product__basic-title'>STOCK {index + 1}</h3>
                                        <ClearSharpIcon
                                            onClick={() => this.handleStockDelete(prdct.id)}
                                            style={{ fontSize: "50px", cursor: "pointer" }}
                                        />
                                    </div>
                                    <div className='add-product__selectable-edit'>
                                        <h3 className='add-product__selectable-edit-title'>STOCK : </h3>
                                        <input
                                            className='add-product__name-input'
                                            type='number'
                                            name='stock'
                                            value={prdct.stock}
                                            onChange={(e) => this.handleSelectableEditChange(e, prdct.id, true)}
                                            placeholder='type something....'
                                        />
                                    </div>{" "}
                                    <div className='add-product__selectable-edit'>
                                        <h3 className='add-product__selectable-edit-title'>PRICE : </h3>
                                        <input
                                            className='add-product__name-input'
                                            type='number'
                                            name='price'
                                            value={prdct.price}
                                            onChange={(e) => this.handleSelectableEditChange(e, prdct.id, true)}
                                            placeholder='type something....'
                                        />
                                    </div>
                                    {selectable.map((s) => (
                                        <div className='add-product__selectable-edit'>
                                            <h3 className='add-product__selectable-edit-title'>{s} : </h3>
                                            <input
                                                className='add-product__name-input'
                                                type='text'
                                                name={s}
                                                value={prdct.selectable[s]}
                                                onChange={(e) => this.handleSelectableEditChange(e, prdct.id, false)}
                                                placeholder='type something....'
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='add-product__stock-selectable' onClick={() => this.setState({ currentPrdct: prdct.id })}>
                                    <h3 className='add-product__basic-title'>STOCK {index + 1}</h3>
                                    <h3>STOCK : {prdct.stock}</h3>
                                    <h3>PRICE : {prdct.price}</h3>
                                    {selectable.map((s) => (
                                        <h3>
                                            {s} : {prdct.selectable[s]}
                                        </h3>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                    <div className='add-product__stock-add-btn' onClick={this.handleStockAdd}>
                        ADD STOCK
                    </div>
                </div>
                <ImageUploader product={product} />
            </div>
        );
    }
}

export default AddProduct;
