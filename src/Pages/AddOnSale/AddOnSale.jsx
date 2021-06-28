import React, { useState, useEffect } from "react";
import "./AddOnSale.css";
import { openMyPopup, getPopup } from "../../util";
import { api } from "../../server";

function AddOnSale() {
    const [searchString, setSearchString] = useState("");
    const [offer, setOffer] = useState(0);
    const [productData, setProductData] = useState([]);
    const [autoCompleteData, setAutoCompleteData] = useState([]);

    useEffect(() => {
        const getAutoCompleteData = async () => {
            try {
                const res = await api.item.autoComplete(searchString);
                setAutoCompleteData(res);
            } catch (e) {}
        };
        getAutoCompleteData();
    }, [searchString]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await api.shop.listOffer();
                setProductData(res);
            } catch (e) {
                getPopup("error", e?.response?.data?.info);
            }
        };
        getData();
    }, []);

    const handleDeleteProductOnSale = async (id) => {
        let data = productData.filter((prdct) => prdct.id !== id);
        try {
            await api.shop.applyOffer(data);
            getPopup("success", "Successfully removed product from sale");
            window.location.reload();
        } catch (e) {
            getPopup("error", e?.response?.data?.info);
        }
    };

    const addOnSale = async () => {
        let itemID = "";
        if (searchString === "") {
            getPopup("error", "Product name cannot be empty");
            return;
        }
        if (offer === 0) {
            getPopup("error", "Offer cannot be 0 %");
            return;
        }
        autoCompleteData.forEach((data) => {
            if (data.name === searchString) itemID = data.itemID;
        });
        if (itemID === "") {
            getPopup("error", "This item is currently unavailable!");
            return;
        }
        let data = productData.filter((prdct) => prdct.name !== searchString);
        data.push({
            itemID,
            offer,
        });
        try {
            await api.shop.applyOffer(data);
            getPopup("success", "successfully added " + searchString + " on sale");
            window.location.reload();
        } catch (e) {
            getPopup("error", e?.response?.data?.info);
        }
    };

    return (
        <div className='add-on-sale'>
            <h1 className='orders__title'>ADD PRODUCT ON SALE</h1>
            <div className='add-on-sale__input'>
                <div className='add-on-sale__input-container'>
                    <h3 className='add-on-sale__input-name'>PRODUCT NAME</h3>
                    <input
                        className='add-on-sale__add-on-sale-box'
                        type='text'
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                        placeholder='type something....'
                        list='sale-auto-complete'
                    />
                    <datalist id='sale-auto-complete'>
                        {autoCompleteData.map((option, index) => (
                            <option key={option.name + index} value={option.name} />
                        ))}
                    </datalist>
                </div>
                <div className='add-on-sale__input-container'>
                    <h3 className='add-on-sale__input-name'>OFFER(%)</h3>
                    <input
                        className='add-on-sale__add-on-sale-box'
                        type='number'
                        value={offer}
                        onChange={(e) => setOffer(e.target.value)}
                        placeholder='type something....'
                    />
                </div>
                <div className='search__button' onClick={() => addOnSale()}>
                    <h1 className='search__button-text'>ADD</h1>
                </div>
            </div>
            <div className='add-on-sale__product-list'>
                <div className='add-on-sale__product-list-item add-on-sale__product-heading'>PRODUCTS</div>
                <div className='add-on-sale__product-list-item add-on-sale__product-heading'>MRP</div>
                <div className='add-on-sale__product-list-item add-on-sale__product-heading'>OFFER(%)</div>
                <div className='add-on-sale__product-list-item add-on-sale__product-heading'>OUR PRICE</div>
                <div className='add-on-sale__product-list-item add-on-sale__product-heading'>ACTION</div>
            </div>
            {productData.map((product) => (
                <div className='add-on-sale__product-list'>
                    <div className='add-on-sale__product-list-item'>{product.name}</div>
                    <div className='add-on-sale__product-list-item'>{product.price}</div>
                    <div className='add-on-sale__product-list-item'>{product.offer}</div>
                    <div className='add-on-sale__product-list-item'>{(product.price * (100 - product.offer)) / 100}</div>
                    <div
                        className='add-on-sale__product-list-item add-on-sale__delete-product'
                        onClick={() =>
                            openMyPopup(`are you sure you want to remove ${product.name} from sale?`, () => handleDeleteProductOnSale(product.itemID))
                        }>
                        DELETE
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AddOnSale;
