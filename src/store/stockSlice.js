import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const STOCK_API_KEY = import.meta.env.VITE_STOCK_API_KEY;

const initialState = {
  stocks: [],
  isLoading: false,
  error: null,
};

export const fetchStocks = createAsyncThunk("stocks/fetchStockSymbols", async (_, { getState }) => {
  const state = getState();

  if (state.stocks.stocks.length > 0) {
    return state.stocks.stocks;
  }

  const response = await axios.get(
    `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${STOCK_API_KEY}`
  );

  return response.data.slice(0, 10);
});

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Fetching stock symbols failed";
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.stocks = action.payload;
      });
  },
});

export default stockSlice.reducer;
