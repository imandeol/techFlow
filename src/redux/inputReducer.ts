import { ProjectInput } from "../types";
import { RESET_FORM, UPDATE_FORM } from "./actions";

interface State {
  formInputState: ProjectInput;
  response?: any;
}

type Action =
  | { type: typeof UPDATE_FORM; payload: ProjectInput }
  | { type: typeof RESET_FORM };

const initialState: State = {
  formInputState: {
    idea: "",
    features: "",
    techStack: "",
    deadline: "",
  },
};

const formInputReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case UPDATE_FORM:
      return { ...state, formInputState: action.payload };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};

export default formInputReducer;
