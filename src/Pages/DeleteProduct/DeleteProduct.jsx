import React, { useState, useEffect } from "react";
import { getPopup, openMyPopup } from "../../util";
import { api } from "../../server";
import "./DeleteProduct.css";

function DeleteProduct() {
    const [searchString, setSearchString] = useState("");
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

    const onProductDelete = async (itemID) => {
        try {
            await api.item.delete({ itemID });
            getPopup("success", "successfully deleted product ");
            window.location.reload();
        } catch (e) {
            getPopup("error", e?.response?.data?.info);
        }
    };

    return (
        <div className='delete-product'>
            <h1 className='orders__title'>DELETE PRODUCT</h1>
            <div className='delete-product__input'>
                <input
                    className='delete-product__delete-product-box'
                    type='text'
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    placeholder='type something....'
                    list='delete-product-auto-complete'
                />
                <datalist id='delete-product-auto-complete'>
                    {autoCompleteData.map((option, index) => (
                        <option key={option.name + index} value={option.name} />
                    ))}
                </datalist>
            </div>
            <div className='delete-product__helper-container'>
                {autoCompleteData.map((product, index) => (
                    <div className='delete-product__row' key={product.itemID}>
                        <h1 className='delete-product__helper-text'>{product.name}</h1>
                        <h5
                            className='delete-product__btn'
                            onClick={() => openMyPopup(`are you sure you want to delete ${product.name}?`, () => onProductDelete(product.itemID))}>
                            DELETE
                        </h5>
                    </div>
                ))}
                {autoCompleteData.length === 0 ? <h1 style={{ margin: "50px" }}>NO ITEMS TO DISPLAY</h1> : null}
            </div>
        </div>
    );
}

export default DeleteProduct;
