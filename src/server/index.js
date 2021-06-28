import { user } from "./apis/user.api";
import { token } from "./apis/token.api";
import { item } from "./apis/item.api";
import { order } from "./apis/order.api";
import { shop } from "./apis/shop.api";
import "./axios.config";
export const api = { user, token, item, order, shop };
