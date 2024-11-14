import { Issue } from "@linear/sdk";
import { STORE_TASKS } from "./actions";

interface IssuesState {
  issues: Issue[];
}

const initialState: IssuesState = {
  issues: [],
};

type IssuesAction = {
  type: string;
  payload: Issue[];
};

const linearReducer = (
  state = initialState,
  action: IssuesAction
): IssuesState => {
  switch (action.type) {
    case STORE_TASKS:
      return {
        ...state,
        issues: action.payload,
      };
    default:
      return state;
  }
};

export default linearReducer;
