import { setEditingGoal, setEditingCategory, setEditingExpense } from "@/store/editSlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useEditStore = () => {
  const dispatch = useDispatch();
  const editState = useSelector((state) => state.edit);

  const updateEditingGoal = useCallback(
    (goal) => {
      dispatch(setEditingGoal(goal));
    },
    [dispatch]
  );
  const updateEditingCategory = useCallback(
    (category) => {
      dispatch(setEditingCategory(category));
    },
    [dispatch]
  );

  const updateEditingExpense = useCallback(
    (expense) => {
      dispatch(setEditingExpense(expense));
    },
    [dispatch]
  );

  return {
    ...editState,
    updateEditingGoal,
    updateEditingCategory,
    updateEditingExpense,
  };
};

export default useEditStore;
