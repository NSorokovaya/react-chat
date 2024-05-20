import { all, fork } from "redux-saga/effects";
import authSagas from "./authSagas";

export default function* rootSaga(): Generator {
  yield all([fork(authSagas)]);
}
