import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';
import { History } from 'history';

export const FetchUser = () => async (dispatch: any) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleStripeToken = (token: string) => async (dispatch: any) => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
}

export const submitSurvey = (values: any, history: History) => async (dispatch: any) => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchSurveys = () => async (dispatch: any) => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
}