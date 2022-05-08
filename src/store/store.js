import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice';
import appReducer from './app/appSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer
  },
})