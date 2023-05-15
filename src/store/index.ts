import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import storage from "redux-persist/lib/storage";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

import rootReducer from "./reducers";

export type RootState = ReturnType<typeof rootReducer>;
const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey:
        process.env.REACT_APP_APP_REDUX_STORE_KEY != null
          ? process.env.REACT_APP_APP_REDUX_STORE_KEY
          : "todo.45rt6y7uio#22",
      onError: function (error) {
        console.error(`redux encryptTransform Error ${error}`);
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type AppDispatch = typeof store.dispatch;
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
