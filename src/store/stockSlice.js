import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const STOCK_API_KEY = import.meta.env.VITE_STOCK_API_KEY;

const initialState = {
  stocks: [],
  isLoading: false,
  error: null,
};

export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  const response = await axios.get(
    `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=${STOCK_API_KEY}`
  );
  return response.data;
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
        state.error = action.error.message || "Fetching stocks failed";
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.stocks = action.payload;
      });
  },
});

export default stockSlice.reducer;
