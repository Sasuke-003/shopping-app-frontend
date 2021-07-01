import axios from "axios";

const url = {
    create: "/order/create",
    list: "/order/list",
    delete: "/order/delete",
    rate: "/order/rate",
};

export const order = {
    create: async () => {
        return await axios.post(url.create);
    },
    delete: async (data) => {
        return await axios.post(url.create, data);
    },
    rate: async (data) => {
        return await axios.post(url.create, data);
    },

    list: async () => {
        const res = await axios.get(url.list);
        return res;
    },
};
