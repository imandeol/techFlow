import { combineReducers } from "@reduxjs/toolkit";
import formInputReducer from "./reducers/inputReducer";
import linearReducer from "./reducers/linearReducer";
import groqResponseReducer from "./reducers/groqReducer";
import { toastReducer } from "./reducers/toastReducer";
import { authReducer } from "./reducers/loginReducer";
import { userReducer } from "./reducers/userReducer";
import { teamReducer } from "./reducers/teamReducer";
import updateTaskReducer from "./reducers/updateTaskReducer";
import workflowReducer from "./reducers/workflowstateReducer";

const rootReducer = combineReducers({
  formInputReducer,
  tasks: linearReducer,
  groqResponse: groqResponseReducer,
  toastValue: toastReducer,
  auth: authReducer,
  user: userReducer,
  teamMembers: teamReducer,
  updateTaskSuccess: updateTaskReducer,
  workflow: workflowReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
