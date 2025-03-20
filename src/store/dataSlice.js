import { DATA_KEY } from "@/constants/constants";
import { createSlice } from "@reduxjs/toolkit";

const defaultCategories = [
  { category: "Food", color: "#1b3eee", id: "1" },
  { category: "Transportation", color: "#900404", id: "2" },
  { category: "Accommodation", color: "#bd720a", id: "3" },
  { category: "Hobbies", color: "#098639", id: "5" },
  { category: "Hygiene", color: "#9de87d", id: "6" },
  { category: "Subscriptions", color: "#002aff", id: "8" },
  { category: "Insurance", color: "#751067", id: "9" },
  { category: "Clothing", color: "#00ff2a", id: "10" },
];

const defaultState = {
  pay: 3000,
  expenses: [],
  goals: [],
  categories: defaultCategories,
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
