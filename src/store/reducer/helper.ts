import { createAction, createReducer } from '@reduxjs/toolkit';
import { isServer } from '../../utils/isServer';

let initialState: {
  firstLoading: boolean;
};

if (isServer) {
  initialState = { firstLoading: true };
} else {
  // eslint-disable-next-line no-underscore-dangle
  initialState = window.__INITIAL_STATE__.helper;
}

export const clearFirstLoading = createAction('firstLoading/clear');
export const helperReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(clearFirstLoading, (state) => {
      state.firstLoading = false;
    });
});
