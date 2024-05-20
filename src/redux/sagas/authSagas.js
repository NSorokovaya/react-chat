import { call, put, takeLatest, take } from "redux-saga/effects";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { login, logout, setCurrentUser } from "../actions";
import { eventChannel } from "redux-saga";

function* loginSaga() {
  try {
    const user = yield call(signInWithPopup, auth, provider);
    yield put(setCurrentUser(user));
  } catch (error) {
    console.error("Login failed", error);
  }
}

function* logoutSaga() {
  try {
    yield call(signOut, auth);
    yield put(setCurrentUser(null));
  } catch (error) {
    console.error("Logout failed", error);
  }
}

function* authStateChangedSaga() {
  const channel = yield call(createAuthChannel);
  while (true) {
    const user = yield take(channel);
    yield put(setCurrentUser(user));
  }
}

function createAuthChannel() {
  return eventChannel((emit) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      emit(user || null);
    });
    return unsubscribe;
  });
}

export default function* authSagas() {
  yield takeLatest(login.type, loginSaga);
  yield takeLatest(logout.type, logoutSaga);
  yield call(authStateChangedSaga);
}
