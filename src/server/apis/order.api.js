import axios from "axios";

const url = {
    create: "/order/create",
    list: "/order/list",
};

export const order = {
    create: async (data) => {
        return await axios.post(url.create, data);
    },

    list: async () => {
        const res = await axios.get(url.list);
        return res;
    },
};
