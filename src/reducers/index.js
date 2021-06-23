import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import tutorials from "./tutorials";
import constructor from "./constructor";
import auto from "./auto";

export default combineReducers({
    auth,
    message,
    tutorials,
    constructor,
    auto
});