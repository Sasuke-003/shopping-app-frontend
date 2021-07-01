import axios from "axios";

const url = {
    signUp: "/user/sign-up/shop",
    signIn: "/user/sign-in",
    basket: "/user/cart",
    checkout: "/user/checkout",
};

export const user = {
    signUp: async (signUpData) => {
        return await axios.post(url.signUp, signUpData);
    },

    signIn: async (signInData) => {
        const res = await axios.post(url.signIn, signInData);
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.accTok}`;
        return res;
    },
    addToBasket: async (data) => {
        const res = await axios.post(url.basket, data);
        return res;
    },
    getBasket: async () => {
        const res = await axios.get(url.basket);
        return res;
    },
    checkOut: async (checkOutData) => {
        const res = await axios.post(url.checkOut, checkOutData);
        return res;
    },
};
