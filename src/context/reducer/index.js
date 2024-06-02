import { combineReducers } from "redux";
import userAuthReducer from "./userAuthReducer";
import projectReducer from "./projectReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  user: userAuthReducer,
  projects: projectReducer,
  searchTerm: searchReducer
})

export default rootReducer;