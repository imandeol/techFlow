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
