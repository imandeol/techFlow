import { combineReducers } from "@reduxjs/toolkit";
import formInputReducer from "./inputReducer";

const rootReducer = combineReducers({ formInputReducer });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
