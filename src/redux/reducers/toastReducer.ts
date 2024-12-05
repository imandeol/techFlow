import { SET_SUCCESS, SET_FAILURE, RESET_TOAST } from "../actions";

interface SuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}

interface FailureAction {
  type: typeof SET_FAILURE;
  payload: string;
}

interface ResetAction {
  type: typeof RESET_TOAST;
}

type ToastActionTypes = SuccessAction | FailureAction | ResetAction;

interface ToastState {
  type: "success" | "failure";
  message: string;
}

const initialState: ToastState | null = null;

export const setToastSuccess = (message: string): SuccessAction => ({
  type: SET_SUCCESS,
  payload: message,
});

export const setToastFailure = (message: string): FailureAction => ({
  type: SET_FAILURE,
  payload: message,
});

export const resetToastValue = (): ResetAction => ({
  type: RESET_TOAST,
});

export const toastReducer = (
  state: ToastState | null = initialState,
  action: ToastActionTypes
): ToastState | null => {
  switch (action.type) {
    case SET_SUCCESS:
      return { type: "success", message: action.payload };
    case SET_FAILURE:
      return { type: "failure", message: action.payload };
    case RESET_TOAST:
      return null;
    default:
      return state;
  }
};
