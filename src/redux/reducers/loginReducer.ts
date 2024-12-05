import { AuthState } from "../../types";
import { getCookie } from "../../utils";
import { AuthActionTypes, LOGIN, LOGOUT } from "../actions";

const initialState: AuthState = {
  isLoggedIn: false,
  access_token: getCookie("linearAccessToken") || null,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        access_token: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        access_token: "",
      };
    default:
      return state;
  }
};
