import { ProjectInput } from "../types";

interface State {
  formInputState: ProjectInput;
  response?: any;
}

const UPDATE_FORM = "UPDATE_FORM";
const RESET_FORM = "RESET_FORM";
const UPDATE_RESPONSE = "UPDATE_RESPONSE";

type Action =
  | { type: typeof UPDATE_FORM; payload: ProjectInput }
  | { type: typeof RESET_FORM }
  | { type: typeof UPDATE_RESPONSE; payload: any }


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
    case UPDATE_RESPONSE:
        return {
          ...state,
          response: action.payload,
     };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};

export default formInputReducer;
