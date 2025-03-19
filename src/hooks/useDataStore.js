import { setCategories, setExpenses, setGoals, setPay, setMany } from "@/state/dataSlice";
import { generateID } from "@/utils/helpers";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useEditStore from "./useEditStore";

const useDataStore = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.data);
  const {
    updateEditingExpense,
    editingExpense,
    editingCategory,
    updateEditingCategory,
    editingGoal,
    updateEditingGoal,
  } = useEditStore();

  const updatePay = useCallback(
    (pay) => {
      dispatch(setPay(pay));
    },
    [dispatch]
  );

  const addExpense = useCallback(
    (expense) => {
      const expenseWithId = {
        ...expense,
        id: generateID(dataState.expenses.map((exp) => exp.id)),
      };
      const updatedExpenses = [...dataState.expenses, expenseWithId];
      dispatch(setExpenses(updatedExpenses));
    },
    [dispatch, dataState]
  );

  const editExpense = useCallback(
    (editedExpense) => {
      const updatedExpenses = [...dataState.expenses].map((exp) =>
        exp.id === editedExpense.id ? editedExpense : exp
      );
      dispatch(setExpenses(updatedExpenses));
    },
    [dispatch, dataState]
  );

  const deleteExpense = useCallback(
    (expenseId) => {
      const filteredExpenses = [...dataState.expenses].filter((exp) => exp.id !== expenseId);

      if (editingExpense && expenseId == editingExpense.id) {
        updateEditingExpense(undefined);
      }

      dispatch(setExpenses(filteredExpenses));
    },
    [dispatch, dataState, editingExpense]
  );

  const addGoal = useCallback(
    (goal) => {
      const goalWithId = {
        ...goal,
        id: generateID(dataState.goals.map((goa) => goa.id)),
      };
      const updatedGoals = [...dataState.goals, goalWithId];
      dispatch(setGoals(updatedGoals));
    },
    [dispatch, dataState]
  );

  const editGoal = useCallback(
    (editedGoal) => {
      console.log("edited:", editedGoal);

      const updatedGoals = [...dataState.goals].map((goa) =>
        editedGoal.id === goa.id ? editedGoal : goa
      );

      console.log(updatedGoals);

      dispatch(setGoals(updatedGoals));
    },
    [dispatch, dataState]
  );

  const deleteGoal = useCallback(
    (goalId) => {
      const filteredGoals = [...dataState.goals].filter((goa) => goa.id !== goalId);

      if (editingGoal && goalId == editingGoal.id) {
        updateEditingGoal(undefined);
      }

      dispatch(setGoals(filteredGoals));
    },
    [dispatch, dataState, editingGoal]
  );

  const addCategory = useCallback(
    (category) => {
      const categoryID = {
        ...category,
        id: generateID(dataState.categories.map((cat) => cat.id)),
      };
      const updatedCategories = [...dataState.categories, categoryID];
      dispatch(setCategories(updatedCategories));
    },
    [dispatch, dataState]
  );

  const editCategory = useCallback(
    (editedCategory) => {
      const updatedCategories = [...dataState.categories].map((cat) =>
        editedCategory.id === cat.id ? editedCategory : cat
      );

      const prevCategory = [...dataState.categories].find(
        (cat) => editedCategory.id === cat.id
      ).category;

      const updatedExpenses = [...dataState.expenses].map((exp) => {
        return {
          ...exp,
          spendingCategory:
            exp.spendingCategory === prevCategory ? editedCategory.category : exp.spendingCategory,
        };
      });

      dispatch(setMany({ categories: updatedCategories, expenses: updatedExpenses }));
    },
    [dispatch, dataState]
  );

  const deleteCategory = useCallback(
    (categoryId) => {
      const filteredCategories = [...dataState.categories].filter((cat) => cat.id !== categoryId);

      const categoryToDelete = [...dataState.categories].find(
        (cat) => cat.id === categoryId
      ).category;

      const filteredExpenses = [...dataState.expenses].filter(
        (exp) => exp.spendingCategory !== categoryToDelete
      );

      if (editingCategory && categoryId == editingCategory.id) {
        updateEditingCategory(undefined);
      }

      dispatch(setMany({ categories: filteredCategories, expenses: filteredExpenses }));
    },
    [dispatch, dataState, editingCategory]
  );

  return {
    ...dataState,
    updatePay,
    addExpense,
    editExpense,
    deleteExpense,
    addGoal,
    editGoal,
    deleteGoal,
    addCategory,
    editCategory,
    deleteCategory,
  };
};

export default useDataStore;
