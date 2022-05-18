import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slice/userSlice';
import { helperReducer } from './reducer/helper';

export const store = configureStore({
  reducer: {
    user: userReducer,
    helper: helperReducer
  }
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
