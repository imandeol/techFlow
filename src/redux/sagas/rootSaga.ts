import { all } from "redux-saga/effects";
import watchUpdateForm from "./generateResponseSaga";
import { watchFetchDataFromLinear } from "./linearSagas";

export default function* rootSaga() {
  yield all([watchFetchDataFromLinear(), watchUpdateForm()]);
}
