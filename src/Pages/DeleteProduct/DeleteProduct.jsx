import React, { useState, useEffect } from "react";
import { getPopup } from "../../util";
import "./DeleteProduct.css";

function DeleteProduct({ history }) {
    const [searchString, setSearchString] = useState("");
    const [productData, setProductData] = useState("");
    const [searchHelper, setSearchHelper] = useState([
        "One Plus 3",
        "One Plus 3T",
        "One Plus 5",
        "One Plus 3T",
        "One Plus 6",
        "One Plus 6T",
        "One Plus 7",
        "One Plus 8T",
        "One Plus 8 Pro",
        "One Plus 9R",
    ]);
    useEffect(() => {
        const getData = async () => {
            try {
                const res = [
                    {
                        name: "One Plus 3T",
                        id: 0,
                    },
                    {
                        name: "One Plus 5",
                        id: 1,
                    },
                    {
                        name: "One Plus 3T",
                        id: 2,
                    },
                    {
                        name: "One Plus 6",
                        id: 3,
                    },
                    {
                        name: "One Plus 6T",
                        id: 4,
                    },
                    {
                        name: "One Plus 7",
                        id: 5,
                    },
                    {
                        name: "One Plus 8T",
                        id: 6,
                    },
                    {
                        name: "One Plus 8 Pro",
                        id: 7,
                    },
                    {
                        name: "One Plus 9R",
                        id: 8,
                    },
                ];
            } catch (e) {}
        };
        getData();
    });

    return (
        <div className='delete-product'>
            <div className='delete-product__input'>
                <input
                    className='delete-product__delete-product-box'
                    type='text'
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    placeholder='type something....'
                />
                <div className='delete-product__button'>
                    <h1 className='delete-product__button-text'>SEARCH</h1>
                </div>
            </div>
            <div className='delete-product__helper-container'>
                {searchHelper.map((helpText, index) => (
                    <div className='delete-product__row'>
                        <h1 className='delete-product__helper-text'>{helpText}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DeleteProduct;
