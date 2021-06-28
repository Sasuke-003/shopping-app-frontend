import axios from "axios";

const url = {
    addDetail: "/item/add-detail",
    addImage: "/item/add-image",
    detail: "/item/detail?itemID=",
    autoComplete: "/item/item-autoComplete?itemName=",
    categoryAutoComplete: "/item/category-autoComplete?category=",
    delete: "/item/delete",
};

export const item = {
    addDetail: async (data) => {
        return await axios.post(url.addDetail, data);
    },

    addImage: async (data) => {
        const res = await axios.post(url.addImage, data);
        return res;
    },
    detail: async (itemID) => {
        const res = await axios.get(url.detail + itemID);
        return res;
    },
    autoComplete: async (itemName) => {
        const res = await axios.get(url.autoComplete + itemName.toUpperCase());
        return res;
    },
    categoryAutoComplete: async (itemName) => {
        const res = await axios.get(url.categoryAutoComplete + itemName.toUpperCase());
        return res;
    },
    delete: async (data) => {
        const res = await axios.post(url.delete, data);
        return res;
    },
};
