import React, { Component } from "react";
import { HorizontalDragScrollEnable } from "../../util";
import ItemDetails from "../../Components/ItemDetails/ItemDetails";
import ProductHomeView from "../../Components/ProductHomeView/ProductHomeView";
import "./Item.css";

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: [
                "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=925&q=80",
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
                "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80",
                "https://images.unsplash.com/photo-1614689540269-7f9315660d59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80",
                "https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
                "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=675&q=80",
                "https://images.unsplash.com/photo-1596568359553-a56de6970068?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1028&q=80",
                "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80",
                "https://images.unsplash.com/photo-1593081891731-fda0877988da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80",
                "https://images.unsplash.com/photo-1513188732907-5f732b831ca8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80",
            ],
        };
    }

    componentDidMount() {
        HorizontalDragScrollEnable("item__image-container");
    }
    render() {
        const { img } = this.state;
        return (
            <div className='item'>
                <div className='item__image-container'>
                    {img.map((imgUrl, index) => (
                        <img key={"img" + index} className='item__image' src={imgUrl} alt='cannot load' />
                    ))}
                </div>
                <ItemDetails />
                <h1 className='product-home-view-title'>SIMILAR PRODUCTS</h1>
                <ProductHomeView className='item__similar-items' />
            </div>
        );
    }
}

export default Item;
