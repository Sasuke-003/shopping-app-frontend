import axios from "axios";

const url = {
    addDetail: "/item/add-detail",
    addImage: "/item/add-image",
    detail: "/item/detail?itemID=",
    autoComplete: "/item/item-autoComplete?itemName=",
    search: "/item/search?itemName=",
    categoryAutoComplete: "/item/category-autoComplete?category=",
    delete: "/item/delete",
    categoryList: "/item/category-list",
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
    search: async (itemName) => {
        const res = await axios.get(url.search + itemName.toUpperCase());
        return res;
    },
    categoryList: async () => {
        const res = await axios.get(url.categoryList);
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
