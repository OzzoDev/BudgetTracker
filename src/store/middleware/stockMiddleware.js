import { fetchStocks } from "../stockSlice";

const triggerFetchStocks = (store) => (next) => (action) => {
  console.log("An action has been dispatched");

  if (action.type === "FETCH_STOCKS") {
    store.dispatch(fetchStocks());
  }
  return next(action);
};

export default triggerFetchStocks;
