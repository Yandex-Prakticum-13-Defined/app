import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slice/userSlice';
import { helperReducer } from './reducer/helper';
import { leaderboardReducer } from './slice/leaderboardSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    leaderboard: leaderboardReducer,
    helper: helperReducer
  }
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
