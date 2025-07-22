import {createSlice} from '@reduxjs/toolkit';

interface IInitialState {
  code: string;
  message: string;
  isOpen: boolean;
  alertType: 'default' | 'danger' | 'gst-success' | 'success';
}

export const initialState: IInitialState = {
  code: '',
  message: '',
  isOpen: false,
  alertType: 'danger',
};

const alertSlice = createSlice({
  name: 'api/alert',
  initialState,
  reducers: {
    setAlertMsg(state, action) {
      state.code = action.payload.code;
      state.message = action.payload.message;
      state.alertType = action.payload.alertType;
      state.isOpen = true;
    },
    closeAlertMsg(state) {
      state.code = '';
      state.message = '';
      state.alertType = 'danger';
      state.isOpen = false;
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice.reducer;
