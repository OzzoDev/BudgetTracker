import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editingGoal: undefined,
  editingCategory: undefined,
  editingExpense: undefined
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    setEditingGoal: (state, action) => {
      state.editingGoal = action.payload;
    },
    setEditingCategory: (state, action) => {
      state.editingCategory = action.payload;
    },
    setEditingExpense: (state, action) => {
      state.editingExpense = action.payload;
    }
  },
});

export const { setEditingGoal, setEditingCategory, setEditingExpense } = editSlice.actions;

export default editSlice.reducer;
