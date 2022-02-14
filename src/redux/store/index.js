import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { getShopTypes } from "./../action/shopTypesAction";
import { getShops } from "./../action/shopsActions";

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getShopTypes());
store.dispatch(getShops());
