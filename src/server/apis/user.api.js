import axios from "axios";

const url = {
    signUp: "/user/sign-up/shop",
    signIn: "/user/sign-in",
    verifyEmail: "/user/verify-email",
    checkOut: "/user/vip-checkout",
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
    verifyEmail: async (verifyEmailData) => {
        const res = await axios.post(url.verifyEmail, verifyEmailData);
        return res;
    },
    checkOut: async (checkOutData) => {
        const res = await axios.post(url.checkOut, checkOutData);
        return res;
    },
};
