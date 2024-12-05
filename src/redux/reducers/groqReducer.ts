import { RESET_RESPONSE, UPDATE_RESPONSE } from "../actions";

interface groqResponseState {
  data: any;
}

type groqAction =
  | { type: typeof UPDATE_RESPONSE; payload: any }
  | { type: typeof RESET_RESPONSE };

const initialState: groqResponseState = {
  data: null,
};

const groqResponseReducer = (
  state: groqResponseState = initialState,
  action: groqAction
): groqResponseState => {
  switch (action.type) {
    case UPDATE_RESPONSE:
      return {
        ...state,
        data: action.payload,
      };
    case RESET_RESPONSE:
      return initialState;
    default:
      return state;
  }
};

export default groqResponseReducer;
