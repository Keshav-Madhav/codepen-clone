import { combineReducers } from "redux";
import userAuthReducer from "./userAuthReducer";
import projectReducer from "./projectReducer";

const rootReducer = combineReducers({
  user: userAuthReducer,
  projects: projectReducer,
})

export default rootReducer;