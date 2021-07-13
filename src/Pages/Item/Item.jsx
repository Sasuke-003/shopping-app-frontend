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
            similarData: [],
        };
    }

    getData = async () => {
        const { match } = this.props;
        let smd = [];
        let res = {};
        try {
            res = await api.item.detail(match.params.id);
        } catch (e) {}
        try {
            const res1 = await api.item.search(res.category);
            smd = res1.itemList;
        } catch (e) {
            console.log(e);
        }
        this.setState({
            item: res,
            similarData: smd,
            isStarted: true,
        });
    };

    componentDidMount() {
        this.getData();
        HorizontalDragScrollEnable("item__image-container");
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.getData();
            console.log("sadasd");
        }
    }

    render() {
        const { item, isStarted, similarData } = this.state;
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
                <ProductHomeView className='item__similar-items' classKey='similar' isStarted={isStarted} products={similarData} />
            </div>
        );
    }
}

export default withRouter(Item);
