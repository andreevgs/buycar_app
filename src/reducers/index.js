import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import tutorials from "./tutorials";
import constructor from "./constructor";
import auto from "./auto";
import offer from "./offer";
import article from "./article";

export default combineReducers({
    auth,
    message,
    tutorials,
    constructor,
    auto,
    offer,
    article
});