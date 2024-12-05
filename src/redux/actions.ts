import { Task } from "../types";

export const UPDATE_FORM = "UPDATE_FORM";
export const UPDATE_RESPONSE = "UPDATE_RESPONSE";
export const RESET_FORM = "RESET_FORM";
export const FETCH_DATA_FROM_LINEAR = "FETCH_DATA_FROM_LINEAR";
export const STORE_TASKS = "STORE_TASKS";
export const RESET_RESPONSE = "RESET_RESPONSE";
export const SET_SUCCESS = "SET_SUCCESS";
export const SET_FAILURE = "SET_FAILURE";
export const RESET_TOAST = "RESET_TOAST";
export const LOGIN_REQUEST = "auth/LOGIN_REQUEST";
export const LOGOUT = "auth/LOGOUT";
export const LOGIN = "auth/LOGIN";
export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const HANDLE_CALLBACK = "HANDLE_CALLBACK";

export interface HandleCallbackAction {
  type: typeof HANDLE_CALLBACK;
  payload: string;
}

export const handleCallback = (code: string): HandleCallbackAction => ({
  type: HANDLE_CALLBACK,
  payload: code,
});

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: number;
}

interface LoginAction {
  type: typeof LOGIN;
  payload: string;
}

interface LogOutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes =
  | HandleCallbackAction
  | LoginRequestAction
  | LoginAction
  | LogOutAction;

export const loginRequest = (loginButtonClicked: number): AuthActionTypes => ({
  type: LOGIN_REQUEST,
  payload: loginButtonClicked,
});

export const loginSuccess = (access_token: string): AuthActionTypes => ({
  type: LOGIN,
  payload: access_token,
});

export const logout = (): AuthActionTypes => ({
  type: LOGOUT,
});

export const updateForm = (payload: any) => ({
  type: UPDATE_FORM,
  payload,
});

export const updateResponse = (payload: any) => ({
  type: UPDATE_RESPONSE,
  payload,
});

export const storeTasks = (payload: Task[]) => ({
  type: STORE_TASKS,
  payload,
});

interface SetUserDetailsAction {
  type: typeof SET_USER_DETAILS;
  payload: {
    user: {
      id: string;
      name: string;
      email: string;
    };
    teamId: string;
  };
}

export const setUserDetails = (
  user: { id: string; name: string; email: string },
  teamId: string
): UserActionTypes => ({
  type: SET_USER_DETAILS,
  payload: { user, teamId },
});

export type UserActionTypes = SetUserDetailsAction;
