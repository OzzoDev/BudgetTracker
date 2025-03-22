import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import editReducer from "./editSlice";
import stockReducer from "./stockSlice";
import triggerFetchStocks from "./middleware/stockMiddleware";

const rootReducer = combineReducers({
  data: dataReducer,
  edit: editReducer,
  stocks: stockReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(triggerFetchStocks),
});

export default store;
