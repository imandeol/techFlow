import { all } from "redux-saga/effects";
import watchUpdateForm from "./generateResponseSaga";

export default function* rootSaga() {
  yield all([
    //watchFetchDataFromLinear(),
    watchUpdateForm(),
  ]);
}
