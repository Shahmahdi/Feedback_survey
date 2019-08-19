import axios from 'axios';
import { FETCH_USER } from './types';

export const FetchUser = () => async (dispatch: any) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleStripeToken = (token: string) => async (dispatch: any) => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
}