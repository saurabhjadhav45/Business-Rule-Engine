import {authActions} from '@pages/auth/store/reducer';
import {dispatch} from '@store';
import axiosInstance, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import BASE_URL from '../helpers/constants';
import STORAGE from '../helpers/storage-helpers/constants';
import StorageHelper from '../helpers/storage-helpers/storage.helper';
import {alertActions} from '../store/alertReducer';
import {API_CONSTANTS, coreActions} from '../store/loadingReducer';

const axios = axiosInstance.create({
  baseURL: BASE_URL,
});

export type API_KEYS = keyof typeof API_CONSTANTS;

export interface AxiosRequestConfigWithParams
  extends InternalAxiosRequestConfig {
  API?: API_KEYS;
}

const handleTopLoader = (isLoading: boolean) => {
  dispatch(coreActions.handleIsLoading(isLoading));
};

axios?.interceptors.request.use(
  (config: AxiosRequestConfigWithParams) => {
    const sessionToken = StorageHelper.getItem(STORAGE.SESSION_TOKEN);
    if (config.headers) {
      if (sessionToken) {
        config.headers.sessionToken = sessionToken;
        config.headers.usrId = StorageHelper.getItem(STORAGE.USER_ID);
      }
    }
    handleTopLoader(true);
    return config;
  },
  (error: AxiosError) => {
    dispatch(
      alertActions.setAlertMsg({
        code: error.code,
        message: error.message,
        alertType: 'danger',
      })
    );
    handleTopLoader(false);
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: unknown[] = [];

const processQueue = (error: unknown, token = null) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  failedQueue.forEach((promise: any) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

axios?.interceptors.response.use(
  (response: AxiosResponse) => {
    handleTopLoader(false);
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    dispatch(
      alertActions.setAlertMsg({
        code: error.code,
        message: error?.response?.data?.message || error.message,
        alertType: 'danger',
      })
    );
    if (error?.response?.status === 403) {
      handleTopLoader(false);
      dispatch(authActions.logout());
      return Promise.reject(error);
    }
    // eslint-disable-next-line no-underscore-dangle
    if (error?.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url === '/auth/refresh') {
        processQueue(error, null);
        handleTopLoader(false);
        // type here should be session expired
        return Promise.reject(error);
      }
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            handleTopLoader(false);
            return axios(originalRequest);
          })
          .catch((isRefreshingError) => {
            handleTopLoader(false);
            return Promise.reject(isRefreshingError);
          });
      }
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        axiosInstance
          .get(`/auth/refresh`)
          .then(({data}: AxiosResponse) => {
            // set access token from response
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.data.token}`;
            originalRequest.headers.Authorization = `Bearer ${data.data.token}`;
            dispatch(authActions.setAccessToken(data.data.token));
            dispatch(authActions.setRefreshToken(data.data.refreshToken));
            processQueue(null, data.data.token);
            StorageHelper.setItem(STORAGE.ACCESS_TOKEN, data.data.token);
            StorageHelper.setItem(
              STORAGE.REFRESH_TOKEN,
              data.data.refreshToken
            );
            handleTopLoader(false);
            resolve(axiosInstance(originalRequest));
          })
          .catch((refreshErr: Error | AxiosResponse) => {
            processQueue(refreshErr, null);

            handleTopLoader(false);
            StorageHelper.clear();
            dispatch(authActions.logout());
            reject(refreshErr);
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }
    handleTopLoader(false);
    if (error.response.data) {
      // dispatch store for enabling modal
    }
    return Promise.reject(error);
  }
);

export default axios;
