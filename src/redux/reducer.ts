import { combineReducers } from "@reduxjs/toolkit";
import formInputReducer from "./reducers/inputReducer";
import linearReducer from "./reducers/linearReducer";
import groqResponseReducer from "./reducers/groqReducer";
import { toastReducer } from "./reducers/toastReducer";
import { authReducer } from "./reducers/loginReducer";

const rootReducer = combineReducers({
  formInputReducer,
  tasks: linearReducer,
  groqResponse: groqResponseReducer,
  toastValue: toastReducer,
  auth: authReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
