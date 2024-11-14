import { call, put, takeLatest } from "redux-saga/effects";
import linearClient from "../../linear/LinearClient";
import { FETCH_DATA_FROM_LINEAR, storeTasks } from "../actions";
import { Issue } from "@linear/sdk";

export function* watchFetchDataFromLinear() {
  yield takeLatest(FETCH_DATA_FROM_LINEAR, fetchDataFromLinear);
}

export function* fetchDataFromLinear() {
  const issues: Issue[] = yield call(linearIssues);
  yield put(storeTasks(issues));
}
export async function linearIssues() {
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
