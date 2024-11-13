import { ProjectInput } from "../types";

interface State {
  formInputState: ProjectInput;
}

const UPDATE_FORM = "UPDATE_FORM";
const RESET_FORM = "RESET_FORM";

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
