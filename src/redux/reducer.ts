import { combineReducers } from "@reduxjs/toolkit";
import formInputReducer from "./inputReducer";
import linearReducer from "./linearReducer";
import groqResponseReducer from "./groqReducer";
import { toastReducer } from "./toastReducer";

const rootReducer = combineReducers({
  formInputReducer,
  tasks: linearReducer,
  groqResponse: groqResponseReducer,
  toastValue: toastReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
