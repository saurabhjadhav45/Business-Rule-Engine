import {IUserData} from '@common/interfaces';
import {createSlice} from '@reduxjs/toolkit';

interface IAuthGenerics<T> {
  userData: T;
  accessToken: string;
  refreshToken: string;
  isLoggedIn: boolean;
  userEmail: string;
  loginEmail: string;
}

const userDataValues = {
  usrFirstName: '',
  usrLastName: '',
  usrEmail: '',
  usrMobile: '',
  usrId: '',
  uuid: '',
  hasAnygstinRegistered: '',
  multiUserType: '',
  createdDate: '',
};

const initialState: IAuthGenerics<IUserData> = {
  accessToken: '',
  refreshToken: '',
  userData: userDataValues,
  isLoggedIn: false,
  userEmail: '',
  loginEmail: '',
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, actions) {
      state.userData = actions.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.accessToken = '';
      state.refreshToken = '';
      state.isLoggedIn = false;
      state.userData = userDataValues;
    },
    setAccessToken(state, actions) {
      state.accessToken = actions.payload;
    },
    setRefreshToken(state, actions) {
      state.refreshToken = actions.payload;
    },
  },
});

const authReducer = auth.reducer;

export const authActions = auth.actions;

export default authReducer;
