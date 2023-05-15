import { combineReducers } from "@reduxjs/toolkit";

import appReducer from "./modules/app";

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
