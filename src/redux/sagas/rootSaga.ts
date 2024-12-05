import { all } from "redux-saga/effects";
import watchUpdateForm from "./generateResponseSaga";
import { watchActionRequests } from "./linearSagas";

export default function* rootSaga() {
  yield all([watchActionRequests(), watchUpdateForm()]);
}
