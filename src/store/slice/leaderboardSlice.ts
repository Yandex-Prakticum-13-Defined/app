import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { baseURL, RATING_FIELD_NAME, TEAM_NAME } from '../../API2/API';
import {
  getLeaderboard as getLeaderboardApi,
  addUserToLeaderboard as addUserToLeaderboardApi, IUserScore, getUserById
} from '../../API2/leaderboardAPI';
import { EStatus, IAsyncData } from '../interface';
import { isServer } from '../../utils/isServer';
import mockProfilePicture from '../../images/mock-profile-picture.jpg';

export interface ILeaderboardRow {
  number: number;
  image: string;
  name: string;
  points: number;
}

let initialState: IAsyncData<ILeaderboardRow[]>;

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

export const leaderboardRequest = {
  ratingFieldName: RATING_FIELD_NAME,
  cursor: 0,
  limit: 10
};

export const getLeaderboard = createAsyncThunk<ILeaderboardRow[], void, { rejectValue: string; }>(
  `leaderboard/${TEAM_NAME}`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLeaderboardApi(leaderboardRequest);

      return await Promise.all(
        response.map(async (item, i) => {
          const userInfo = await getUserById(item.data.userId);

          return {
            number: i + 1,
            image: userInfo.avatar ? `${baseURL}/resources${userInfo.avatar}` : mockProfilePicture,
            name: userInfo.first_name,
            points: item.data.score
          };
        })
      );
    } catch (err) {
      const errMessage = (err as Error)?.message;

      return rejectWithValue(errMessage);
    }
  }
);

export const addUserToLeaderboard = createAsyncThunk<string, IUserScore, { rejectValue: string; }>(
  'leaderboard',
  async (userScore: IUserScore, { rejectWithValue }) => {
    try {
      return await addUserToLeaderboardApi(userScore);
    } catch (err) {
      const errMessage = (err as Error)?.message;

      return rejectWithValue(errMessage);
    }
  }
);

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    addLeaderboardData: (state, action: PayloadAction<ILeaderboardRow[]>) => {
      state.data = action.payload;
    }
  },
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
  actions: { addLeaderboardData },
  reducer
} = leaderboardSlice;

export {
  addLeaderboardData,
  reducer as leaderboardReducer
};
