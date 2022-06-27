import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createMessage as createMessageApi,
  createTopic as createTopicApi,
  getAllTopics as getAllTopicsApi,
  getMessagesByTopicId as getMessagesByTopicIdApi,
  IMessage,
  ITopic
} from '../../API/forumAPI';
import { EStatus, IAsyncData } from '../interface';
import { isServer } from '../../utils/isServer';
import { IDBTopic } from '../../db/models/topic';
import { IDBMessage } from '../../db/models/message';

interface IDBFields {
  id: number;
  createdAt: string;
}

export interface IDBTopicData extends IDBTopic, IDBFields {}

export interface IDBMessageData extends IDBMessage, IDBFields {
  topicTitle?: string;
}

let initialState: {
  topics: IAsyncData<ITopic[]>;
  messages: IAsyncData<IMessage[]>;
  createTopicStatus: EStatus;
  createMessageStatus: EStatus;
};

if (isServer) {
  initialState = {
    topics: {
      data: [],
      error: null,
      status: EStatus.IDLE
    },
    messages: {
      data: [],
      error: null,
      status: EStatus.IDLE
    },
    createTopicStatus: EStatus.IDLE,
    createMessageStatus: EStatus.IDLE
  };
} else {
  // eslint-disable-next-line no-underscore-dangle
  initialState = window.__INITIAL_STATE__.forum;
}

export const createTopic = createAsyncThunk<string, IDBTopic, { rejectValue: string; }>(
  'topic',
  async (topic: IDBTopic, { rejectWithValue }) => {
    try {
      return await createTopicApi(topic);
    } catch (err) {
      const errMessage = (err as Error)?.message;

      return rejectWithValue(errMessage);
    }
  }
);

export const createMessage = createAsyncThunk<string, IDBMessage, { rejectValue: string; }>(
  'message',
  async (message: IDBMessage, { rejectWithValue }) => {
    try {
      return await createMessageApi(message);
    } catch (err) {
      const errMessage = (err as Error)?.message;

      return rejectWithValue(errMessage);
    }
  }
);

export const getAllTopics = createAsyncThunk<ITopic[], void, { rejectValue: string; }>(
  'topics',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllTopicsApi();
    } catch (err) {
      const errMessage = (err as Error)?.message;

      return rejectWithValue(errMessage);
    }
  }
);

export const getMessagesByTopicId = createAsyncThunk<IMessage[], number, { rejectValue: string; }>(
  'messages',
  async (topicId: number, { rejectWithValue }) => {
    try {
      return await getMessagesByTopicIdApi(topicId);
    } catch (err) {
      const errMessage = (err as Error)?.message;

      return rejectWithValue(errMessage);
    }
  }
);

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    addTopicsData: (state, action: PayloadAction<ITopic[]>) => {
      state.topics.data = action.payload;
    },
    addMessagesData: (state, action: PayloadAction<IMessage[]>) => {
      state.messages.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createTopic.pending, (state) => {
      state.createTopicStatus = EStatus.PENDING;
    });
    builder.addCase(createTopic.fulfilled, (state) => {
      state.createTopicStatus = EStatus.FULFILLED;
    });
    builder.addCase(createTopic.rejected, (state) => {
      state.createTopicStatus = EStatus.REJECTED;
    });

    builder.addCase(createMessage.pending, (state) => {
      state.createMessageStatus = EStatus.PENDING;
    });
    builder.addCase(createMessage.fulfilled, (state) => {
      state.createMessageStatus = EStatus.FULFILLED;
    });
    builder.addCase(createMessage.rejected, (state) => {
      state.createMessageStatus = EStatus.REJECTED;
    });

    builder.addCase(getAllTopics.pending, (state) => {
      state.topics.status = EStatus.PENDING;
      state.topics.error = null;
    });
    builder.addCase(getAllTopics.fulfilled, (state, { payload }) => {
      state.topics.data = payload;
      state.topics.status = EStatus.FULFILLED;
    });
    builder.addCase(getAllTopics.rejected, (state, { payload }) => {
      state.topics.error = payload || 'Неопознанная ошибка!';
      state.topics.status = EStatus.REJECTED;
    });

    builder.addCase(getMessagesByTopicId.pending, (state) => {
      state.messages.status = EStatus.PENDING;
      state.messages.error = null;
    });
    builder.addCase(getMessagesByTopicId.fulfilled, (state, { payload }) => {
      state.messages.data = payload;
      state.messages.status = EStatus.FULFILLED;
    });
    builder.addCase(getMessagesByTopicId.rejected, (state, { payload }) => {
      state.messages.error = payload || 'Неопознанная ошибка!';
      state.messages.status = EStatus.REJECTED;
    });
  }
});

const {
  actions: { addTopicsData, addMessagesData },
  reducer
} = forumSlice;

export {
  addTopicsData,
  addMessagesData,
  reducer as forumReducer
};
