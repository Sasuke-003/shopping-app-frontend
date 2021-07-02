import axios from "axios";

const url = {
    create: "/order/create",
    list: "/order/list",
    delete: "/order/cancel",
    rate: "/order/rate",
};

export const order = {
    create: async (data) => {
        return await axios.post(url.create, data);
    },
    delete: async (data) => {
        return await axios.post(url.delete, data);
    },
    rate: async (data) => {
        return await axios.post(url.rate, data);
    },

    list: async () => {
        const res = await axios.get(url.list);
        return res;
    },
};
