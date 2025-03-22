import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useStockStore = () => {
  const dispatch = useDispatch();
  const stockState = useSelector((state) => state.stocks);

  const getStocks = useCallback(() => {
    dispatch({ type: "FETCH_STOCKS" });
  });

  return {
    ...stockState,
    getStocks,
  };
};

export default useStockStore;
