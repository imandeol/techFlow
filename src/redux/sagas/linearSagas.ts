import { call, put, takeLatest } from "redux-saga/effects";
import {
  AuthActionTypes,
  FETCH_DATA_FROM_LINEAR,
  HANDLE_CALLBACK,
  LOGIN,
  LOGIN_REQUEST,
  loginSuccess,
  LOGOUT,
  RESET_FORM,
  setUserDetails,
  storeTasks,
  UPDATE_RESPONSE,
} from "../actions";
import { navigateTo } from "../navigate";
import axios from "axios";
import { setToastFailure, setToastSuccess } from "../reducers/toastReducer";
import { clearSpecificCookie } from "../../utils";
//@ts-ignore
import { configs } from "../../../config";
import store from "../store";

const API_BASE_URL = "https://tech-flow-backend.vercel.app/api";

export function* watchActionRequests() {
  yield takeLatest(FETCH_DATA_FROM_LINEAR, fetchDataFromLinear);
  yield takeLatest(UPDATE_RESPONSE, createTasksFromGroq);
  yield takeLatest(LOGOUT, handleLogOut);
  yield takeLatest(LOGIN, fetchDataAfterLogin);
  yield takeLatest(LOGIN_REQUEST, startOAuthSaga);
  yield takeLatest(HANDLE_CALLBACK, handleCallbackSaga);
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

  tasks.reverse();

  try {
    const state = store.getState();
    const { teamId } = state.user;
    const accessToken = state.auth.access_token;
    //@ts-ignore
    const response = yield call(axios.post, `${API_BASE_URL}/create`, {
      tasks,
      teamId,
      accessToken,
    });
    //`http://localhost:3000/api/create`, {
    if (response.data.success) {
      yield call(navigateTo, "/");
      yield put(
        setToastSuccess("Successfully created Tasks for your App Idea")
      );
      yield put({ type: RESET_FORM });
    } else {
      console.error("Error creating tasks:", response.data.error);
    }
  } catch (error) {
    console.error("Error sending to server:", error);
  }
}

export function* handleLogOut() {
  yield call(clearSpecificCookie, "linearAccessToken");
  localStorage.removeItem("teamId");
  yield call(navigateTo, "/");
}

function* startOAuthSaga(action: AuthActionTypes) {
  const { linearClientId, redirectUri } = configs;
  const authUrl = `https://linear.app/oauth/authorize?client_id=${linearClientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=write,admin`;
  if (action.payload < 2) window.open(authUrl, "_blank");
  else window.location.href = authUrl;
}

function* handleCallbackSaga(action: AuthActionTypes) {
  try {
    if (action.type === HANDLE_CALLBACK) {
      const code = action.payload;

      const { linearClientSecret, linearClientId, redirectUri } = configs;
      //@ts-ignore
      const response = yield call(
        axios.post,
        "https://api.linear.app/oauth/token",
        {
          client_id: linearClientId,
          client_secret: linearClientSecret,
          code,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const data = response.data;

      if (response.status === 200 && data.access_token) {
        const expirationDays = 7;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + expirationDays);
        document.cookie = `linearAccessToken=${
          data.access_token
        }; path=/; expires=${expirationDate.toUTCString()};SameSite=Lax`;
        yield put(loginSuccess(data.access_token));
      } else {
        throw new Error(data.error || "OAuth failed");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export function* fetchDataAfterLogin(action: {
  type: typeof LOGIN;
  payload: string;
}) {
  try {
    const data = yield call(
      axios.post,
      `${API_BASE_URL}/getLinearData`,
      //"http://localhost:3000/api/getLinearData",
      {
        accessToken: action.payload,
      }
    );
    const { user, teamId } = data.data;
    localStorage.setItem("teamId", teamId);
    yield put(setUserDetails(user, teamId));
    navigateTo("/dashboard");
  } catch (error) {
    console.error("Failed to fetch Linear data:", error);
  }
}

export function* fetchDataFromLinear() {
  try {
    const state = store.getState();
    const teamId = state.user.teamId || localStorage.getItem("teamId");
    const accessToken = state.auth.access_token;
    //@ts-ignore
    const response = yield call(axios.post, `${API_BASE_URL}/fetch`, {
      teamId,
      accessToken,
    });
    //"http://localhost:3000/api/fetch"
    if (response.data.success) {
      yield put(storeTasks(response.data.data));
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
