import { combineReducers } from "redux";
import itemsReducer from "./item";

const RootReducer= combineReducers({itemsReducer,})

export default RootReducer