import { createAction, createReducer } from '@reduxjs/toolkit';

export const clearFirstLoading = createAction('firstLoading/clear');
export const helperReducer = createReducer({ firstLoading: true }, (builder) => {
  builder
    .addCase(clearFirstLoading, (state) => {
      state.firstLoading = false;
    });
});
