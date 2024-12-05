import { Task } from "../../types";
import { STORE_TASKS } from "../actions";

interface IssuesState {
  issues: Task[] | undefined;
}

const initialState: IssuesState = {
  issues: undefined,
};

type IssuesAction = {
  type: string;
  payload: Task[];
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
