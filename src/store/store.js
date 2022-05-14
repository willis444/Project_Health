import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice';
import appReducer from './app/appSlice';
import foodReducer from './food/foodSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    food: foodReducer,
  },
})