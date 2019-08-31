import { FETCH_SURVEYS } from "../actions/types";

export const FetchSurveys = (state = [], action: any) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}