import { Issue } from "@linear/sdk";

export const UPDATE_FORM = "UPDATE_FORM";
export const UPDATE_RESPONSE = "UPDATE_RESPONSE";
export const RESET_FORM = "RESET_FORM";
export const FETCH_DATA_FROM_LINEAR = "FETCH_DATA_FROM_LINEAR";
export const STORE_TASKS = "STORE_TASKS";

export const updateForm = (payload: any) => ({
  type: UPDATE_FORM,
  payload,
});

export const updateResponse = (payload: any) => ({
  type: UPDATE_RESPONSE,
  payload,
});

export const storeTasks = (payload: Issue[]) => ({
  type: STORE_TASKS,
  payload,
});
