import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_DATA_FROM_LINEAR,
  storeTasks,
  UPDATE_RESPONSE,
} from "../actions";
import { navigateTo } from "../navigate";
import axios from "axios";
import { setToastFailure, setToastSuccess } from "../toastReducer";

const API_BASE_URL = "https://tech-flow-backend.vercel.app/api";

export function* watchFetchDataFromLinear() {
  yield takeLatest(FETCH_DATA_FROM_LINEAR, fetchDataFromLinear);
  yield takeLatest(UPDATE_RESPONSE, createTasksFromGroq);
}

export function* createTasksFromGroq(action: {
  type: typeof UPDATE_RESPONSE;
  payload: any;
}) {
  const data = JSON.parse(action.payload);
  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  let currentDueDate = new Date();
  const tasks = data.tasks?.map((task: any) => {
    currentDueDate.setDate(currentDueDate.getDate() + task.daysRequired);
    const taskDueDate = new Date(currentDueDate);
    return {
      ...task,
      dueDate: formatDate(taskDueDate),
    };
  });

  try {
    //@ts-ignore
    const response = yield call(axios.post, `${API_BASE_URL}/create`, {
      tasks,
    });
    if (response.data.success) {
      console.log("Tasks created successfully:", response.data.data);
      yield call(navigateTo, "/");
      yield put(
        setToastSuccess("Successfully created Tasks for your App Idea")
      );
    } else {
      console.error("Error creating tasks:", response.data.error);
    }
  } catch (error) {
    console.error("Error sending to server:", error);
  }
}

export function* fetchDataFromLinear() {
  try {
    //@ts-ignore
    const response = yield call(axios.get, `${API_BASE_URL}/fetch`);
    if (response.data.success) {
      yield put(storeTasks(response.data.data.reverse()));
    } else {
      console.error("Error fetching tasks:", response.data.error);
    }
  } catch (error) {
    console.error("Error fetching from server:", error);
    yield put(
      setToastFailure("Error in fetching tasks, kindly reload the page.")
    );
  }
}
