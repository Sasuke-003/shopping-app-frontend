import React, { useState, useEffect } from "react";
import { getPopup } from "../../util";
import { ROUTER_LINKS } from "../../Router";
import { api } from "../../server";
import StripeCheckout from "react-stripe-checkout";
import { withRouter } from "react-router-dom";
import "./Checkout.css";

function Checkout({ history }) {
    const [address, setAddress] = useState("");
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleToken = async (token) => {
        try {
            await api.order.create(token);
            getPopup("success", "Payment Successful");
            history.push(ROUTER_LINKS.orders);
        } catch (e) {
            getPopup("error", e?.response?.data?.info);
        }
    };
    const getData = async (data) => {
        try {
            let totalPrice = 0;
            let totalItems = 0;
            const res = await api.user.getBasket();
            let datas = [...res];
            datas.forEach((data) => {
                data.itemObj.subDetail.forEach((element) => {
                    if (element._id === data.subID) {
                        let discountPrice = (element.price * (100 - data?.offer)) / 100;
                        totalPrice += discountPrice * data.qty;
                        totalItems += data.qty;
                        data["price"] = discountPrice;
                    }
                });
            });
            setTotalPrice(totalPrice);
            setTotalItems(totalItems);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getData();
    });
    return (
        <div className='checkout'>
            <h1 className='orders__title'>CHECKOUT</h1>
            <div className='checkout__left'>
                <h2 style={{ marginBottom: "25px" }}>TOTAL ITEMS : {totalItems}</h2>
                <h2>TOTAL AMOUNT : ${totalPrice}</h2>
                {/* <h2 style={{ marginBottom: "25px", marginTop: '50px' }}>YOUR ADDRESS</h2>
                <textarea
                    className='add-product__name-input'
                    type='textarea'
                    name='description'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder='type something....'
                    id='txtArea'
                    rows='10'
                    cols='50'
                    style={{ width: "40%" }}
                /> */}
            </div>
            <StripeCheckout
                className='checkout__btn'
                stripeKey='pk_test_51HZtARDZqVuGT7K51hHLQTK0LTlrlTP2AoCrzOZmzmsZoUeiEILSAXXozrkKfnT09x8899DW684IiEe48EddM0PO00MB9ROiE9'
                token={handleToken}
                billingAddress
                email={localStorage.getItem("email")}
            />
        </div>
    );
}

export default withRouter(Checkout);
