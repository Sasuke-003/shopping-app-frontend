import axios from "axios";

const url = {
    details: "/shop/details",
    applyOffer: "/shop/apply-offer",
    listOffer: "/shop/list-offer",
    getBanner: "/shop/banner",
    popular: "/shop/popular",
    recommended: "/shop/recommended",
};

export const shop = {
    details: async (data) => {
        return await axios.post(url.details, data);
    },

    applyOffer: async (data) => {
        const res = await axios.post(url.applyOffer, data);
        return res;
    },
    getBanner: async () => {
        const res = await axios.get(url.getBanner);
        return res;
    },
    listOffer: async () => {
        const res = await axios.get(url.listOffer);
        return res;
    },
    popular: async () => {
        const res = await axios.get(url.popular);
        return res;
    },
    recommended: async () => {
        const res = await axios.get(url.recommended);
        return res;
    },
};
