import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import authSagas from "./sagas/authSagas";
import messagingSaga from "./messaging/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(authSagas);
sagaMiddleware.run(messagingSaga);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
