import axios from "axios";

import { setUserStatus, setUserToken } from "../../util";
const url = {
    newToken: "/tok/refresh",
    clearToken: "/tok/clear",
};

export const token = {
    getNewTokenAndRetry: async (reqToBeRetried) => {
        const res = await axios.get(url.newToken);
        try {
            axios.defaults.headers.common["Authorization"] = res.accTok;
            localStorage.setItem("accTok", res.accTok);
            if (reqToBeRetried) return await retryReq(reqToBeRetried);
        } catch (err) {
            throw res;
        }
    },

    clearToken: () => {
        clearAllData();
        axios
            .create({
                baseURL: axios.defaults.baseURL,
                withCredentials: true,
            })
            .get(url.clearToken);
    },
};

async function retryReq(req) {
    req.headers["Authorization"] = axios.defaults.headers.common["Authorization"];
    // because the data part will be in string format which has to be converted to json obj before sending
    if (req.data) req.data = JSON.parse(`${req.data}`);
    return await axios.request(req);
}

// Executed During signOut ( found in request.user.signOut )
function clearAllData() {
    localStorage.clear();
    // Clears all Cookie  ( From : https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript )
    document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    setUserToken(null);
    setUserStatus("isLoggedIn", false);
    setUserStatus("isAdmin", false);
}
