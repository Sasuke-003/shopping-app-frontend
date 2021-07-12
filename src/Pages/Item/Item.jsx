import React, { Component } from "react";
import { HorizontalDragScrollEnable, getPopup, SERVER_URL } from "../../util";
import ItemDetails from "../../Components/ItemDetails/ItemDetails";
import ProductHomeView from "../../Components/ProductHomeView/ProductHomeView";
import { withRouter } from "react-router-dom";
import { api } from "../../server";
import axios from "axios";
import "./Item.css";
import CircularProgress from "@material-ui/core/CircularProgress";
class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            isStarted: false,
        };
    }

    getData = async () => {
        const { match } = this.props;
        try {
            const res = await api.item.detail(match.params.id);
            this.setState({
                item: res,
                isStarted: true,
            });
        } catch (e) {}
    };

    componentDidMount() {
        this.getData();
        HorizontalDragScrollEnable("item__image-container");
    }

    render() {
        const { item, isStarted } = this.state;
        return !isStarted ? (
            <div className='item__image-container'>
                {" "}
                <CircularProgress size='45px' />
            </div>
        ) : (
            <div className='item'>
                <div className='item__image-container'>
                    {item?.img?.map((imgUrl, index) => (
                        <img key={"img" + index} className='item__image' src={SERVER_URL + "item/" + imgUrl} alt='cannot load' />
                    ))}
                </div>
                <ItemDetails />
                <h1 className='product-home-view-title'>SIMILAR PRODUCTS</h1>
                <ProductHomeView className='item__similar-items' />
            </div>
        );
    }
}

export default withRouter(Item);
