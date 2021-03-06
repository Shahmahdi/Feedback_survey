import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer";
import { reducer as reduxForm } from "redux-form";
import { FetchSurveys } from "./SurveyReducer";

export const Reducers = combineReducers({
  auth: AuthReducer,
  form: reduxForm,
  surveys: FetchSurveys
});