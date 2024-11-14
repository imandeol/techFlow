import { call, put, takeLatest } from "redux-saga/effects";
import linearClient from "../../linear/LinearClient";
import {
  FETCH_DATA_FROM_LINEAR,
  storeTasks,
  UPDATE_RESPONSE,
} from "../actions";
import { Issue } from "@linear/sdk";
import { Task } from "../../types";
import { navigateTo } from "../navigate";

export function* watchFetchDataFromLinear() {
  yield takeLatest(FETCH_DATA_FROM_LINEAR, fetchDataFromLinear);
  yield takeLatest(UPDATE_RESPONSE, createTasksFromGroq);
}

export function* fetchDataFromLinear() {
  const issues: Issue[] = yield call(getlinearIssues);
  yield put(storeTasks(issues));
}

export function* createTasksFromGroq(action: {
  type: typeof UPDATE_RESPONSE;
  payload: any;
}) {
  const data = action.payload;
  const tasksArray: Task[] = JSON.parse(data).tasks;
  yield call(createLinearIssue, tasksArray);
}

async function createLinearIssue(tasksArray: Task[]) {
  try {
    if (Array.isArray(tasksArray)) {
      for (let i = 0; i < tasksArray.length; i++) {
        const issue = await linearClient.createIssue({
          teamId: "879867c7-2b08-4fb4-8b82-66d9d74267d1",
          title: tasksArray[i].title,
          description: tasksArray[i].description,
          dueDate: tasksArray[i].dueDate,
        });
        console.log("Issue created:", issue);
      }
    }
    navigateTo("/");
  } catch (error) {
    console.error("Error creating issue:", error);
  }
}
export async function getlinearIssues() {
  try {
    const issues = await linearClient.issues({
      filter: { team: { id: { eq: "879867c7-2b08-4fb4-8b82-66d9d74267d1" } } },
    });
    console.log(issues.nodes);
    return issues.nodes;
  } catch (error) {
    console.error("Error fetching team issues:", error);
    return [];
  }
}
