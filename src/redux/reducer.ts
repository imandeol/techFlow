import { combineReducers } from "@reduxjs/toolkit";
import formInputReducer from "./inputReducer";
import linearReducer from "./linearReducer";
import groqResponseReducer from "./groqReducer";

const rootReducer = combineReducers({
  formInputReducer,
  tasks: linearReducer,
  groqResponse: groqResponseReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
