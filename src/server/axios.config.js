import axios from "axios";
import { Logger } from "./logger";
import { getPopup } from "../util";
import { token } from "./apis/token.api";
const log = new Logger();

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = "";

axios.interceptors.request.use(
    async (req) => {
        log.request(req);
        return req;
    },
    (err) => {
        getPopup("error", "Req-Interceptor Error, Try After Sometime");
        console.log(err);
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    (res) => {
        log.response(res);
        return res?.data?.data;
    },
    async (err) => {
        const failedRequest = err.config;
        log.response(err);
        const errType = err?.response?.data?.err;
        // if (err?.response?.data?.info) getPopup("error", err.response.data.info);
        // If Server isn't running code will be undefined
        if (errType === undefined) {
            getPopup("error", "Server Offline, Try After Sometime...");
            return Promise.reject(err?.response?.data);
        } else {
            switch (errType) {
                case "InvalidToken": // Falls Through
                case "TokenExpired":
                    // If There is any token error while refreshing token then sign-out immediately
                    if (err.config.url === "/tok/refresh") {
                        getPopup("error", err.response.data.info);
                        return token.clearToken();
                    }
                    // Otherwise Obtain refresh token and retry failed request

                    return token.getNewTokenAndRetry(failedRequest);
                default:
                    getPopup("error", err.response.data.info);
                    break;
            }
        }
        return Promise.reject(err);
    }
);
