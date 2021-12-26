import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from 'react-redux-firebase-auth';

export const reducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
