import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser as getUserApi, IUserData } from '../../api/api';
import { EStatus, IAsyncData } from '../interface';

const initialState: IAsyncData<IUserData> = {
  data: {},
  error: null,
  status: EStatus.IDLE
};

export const getUser = createAsyncThunk<IUserData, void, { rejectValue: string; }>(
  'auth/user',
  async (_, { rejectWithValue }) => {
    try {
      return await getUserApi();
    } catch (err) {
      const errMessage = (err as Error)?.message;

      return rejectWithValue(errMessage);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.data = {};
      state.error = null;
      state.status = EStatus.IDLE;
    },
    addUserData: (state, action: PayloadAction<IUserData>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.status = EStatus.PENDING;
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = EStatus.FULFILLED;
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      state.error = payload || 'Неопознанная ошибка!';
      state.status = EStatus.REJECTED;
    });
  },
});

const {
  actions: { addUserData, clearUserData },
  reducer
} = userSlice;

export {
  addUserData,
  clearUserData,
  reducer as userReducer
};
