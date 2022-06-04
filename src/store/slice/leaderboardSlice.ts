import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getLeaderboard as getLeaderboardApi,
  addUserToLeaderboard as addUserToLeaderboardApi,
  ILeaderboard, RATING_FIELD_NAME, TEAM_NAME
} from '../../api/api';
import { EStatus, IAsyncData } from '../interface';
import { isServer } from '../../utils/isServer';

let initialState: IAsyncData<ILeaderboard[]>;

if (isServer) {
  initialState = {
    data: [],
    error: null,
    status: EStatus.IDLE
  };
} else {
  // eslint-disable-next-line no-underscore-dangle
  initialState = window.__INITIAL_STATE__.leaderboard;
}

export const getLeaderboard = createAsyncThunk<ILeaderboard[], void, { rejectValue: string; }>(
  `leaderboard/${TEAM_NAME}`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLeaderboardApi({ ratingFieldName: RATING_FIELD_NAME, cursor: 0, limit: 10 });

      return response.map((item) => ({
        score: item.data.score,
        userId: item.data.userId,
        userName: item.data.userName
      }));
    } catch (err) {
      const errMessage = (err as Error)?.message;

      return rejectWithValue(errMessage);
    }
  }
);

export const addUserToLeaderboard = createAsyncThunk<string, ILeaderboard, { rejectValue: string; }>(
  'leaderboard',
  async (leaderData: ILeaderboard, { rejectWithValue }) => {
    try {
      return await addUserToLeaderboardApi(leaderData);
    } catch (err) {
      const errMessage = (err as Error)?.message;

      return rejectWithValue(errMessage);
    }
  }
);

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLeaderboard.pending, (state) => {
      state.status = EStatus.PENDING;
      state.error = null;
    });
    builder.addCase(getLeaderboard.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = EStatus.FULFILLED;
    });
    builder.addCase(getLeaderboard.rejected, (state, { payload }) => {
      state.error = payload || 'Неопознанная ошибка!';
      state.status = EStatus.REJECTED;
    });

    builder.addCase(addUserToLeaderboard.pending, (state) => {
      state.status = EStatus.PENDING;
      state.error = null;
    });
    builder.addCase(addUserToLeaderboard.fulfilled, (state) => {
      state.status = EStatus.FULFILLED;
    });
    builder.addCase(addUserToLeaderboard.rejected, (state, { payload }) => {
      state.error = payload || 'Неопознанная ошибка!';
      state.status = EStatus.REJECTED;
    });
  }
});

const {
  reducer
} = leaderboardSlice;

export {
  reducer as leaderboardReducer
};
