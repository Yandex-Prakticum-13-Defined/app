import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slice/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
