import { DATA_KEY } from "@/constants/constants";
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  pay: 0,
  expenses: [],
  goals: [],
  categories: [],
};

const initialState = (() => {
  try {
    const storedData = localStorage.getItem(DATA_KEY);
    return storedData ? JSON.parse(storedData) : defaultState;
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
    return defaultState;
  }
})();

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPay: (state, action) => {
      state.pay = action.payload;
      localStorage.setItem(DATA_KEY, JSON.stringify(state));
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      localStorage.setItem(DATA_KEY, JSON.stringify(state));
    },
    setGoals: (state, action) => {
      state.goals = action.payload;
      localStorage.setItem(DATA_KEY, JSON.stringify(state));
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
      localStorage.setItem(DATA_KEY, JSON.stringify(state));
    },
    setMany: (state, action) => {
      Object.assign(state, action.payload);
      localStorage.setItem(DATA_KEY, JSON.stringify(state));
    },
  },
});

export const { setPay, setExpenses, setGoals, setCategories, setMany } = dataSlice.actions;

export default dataSlice.reducer;
