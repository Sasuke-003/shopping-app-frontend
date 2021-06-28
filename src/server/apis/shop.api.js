import axios from "axios";

const url = {
    details: "/shop/details",
    applyOffer: "/shop/apply-offer",
    listOffer: "/shop/list-offer",
};

export const shop = {
    details: async (data) => {
        return await axios.post(url.details, data);
    },

    applyOffer: async (data) => {
        const res = await axios.post(url.applyOffer, data);
        return res;
    },
    listOffer: async () => {
        const res = await axios.get(url.listOffer);
        return res;
    },
};
