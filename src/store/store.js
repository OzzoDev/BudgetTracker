import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import editReducer from "./editSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    edit: editReducer,
  },
});

export default store;
