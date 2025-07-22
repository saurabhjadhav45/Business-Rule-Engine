import {createSlice} from '@reduxjs/toolkit';

export const API_CONSTANTS = Object.freeze({
  LOGIN: true,
  REGISTER: false,
});

const initialState = {
  isAppLoading: false,
  hasTopLevelLoading: false,
  appLoading: {
    ...API_CONSTANTS,
  },
};

const core = createSlice({
  name: 'core',
  initialState,
  reducers: {
    handleIsLoading(state, action) {
      state.isAppLoading = action.payload;
    },
  },
});

const coreReducer = core.reducer;

export const coreActions = core.actions;

export default coreReducer;
