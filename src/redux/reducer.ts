import { combineReducers } from "@reduxjs/toolkit";
import formInputReducer from "./inputReducer";
import linearReducer from "./linearReducer";

const rootReducer = combineReducers({ formInputReducer, tasks: linearReducer });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
