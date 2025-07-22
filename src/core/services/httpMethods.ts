import {dispatch} from '@store';
import {AxiosError, AxiosRequestConfig} from 'axios';

import {alertActions} from '../store/alertReducer';
import axios from './axios';

function throwError(e: {response: unknown}) {
  throw e.response;
}

export async function get(url: string, data?: object) {
  try {
    const resp = await axios.get(url, data);
    return resp.data;
  } catch (e) {
    return throwError(e as {response: unknown});
  }
}

export async function post(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig | undefined
): Promise<unknown> {
  try {
    const res = await axios.post(url, data, config);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      dispatch(
        alertActions.setAlertMsg({
          code: e?.response?.data.error_cd || e.code,
          message: e?.response?.data.message || e.message,
          alertType: 'danger',
        })
      );
    }
    return throwError(e as {response: unknown});
  }
}

// keep below underscore-dangle off for only this function as the name
// overlaps with the delete keyword in javascript
// eslint-disable-next-line no-underscore-dangle
export async function _delete(url: string, data?: unknown): Promise<unknown> {
  try {
    const res = await axios.delete(
      url,
      data as AxiosRequestConfig<unknown> | undefined
    );
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      dispatch(
        alertActions.setAlertMsg({
          code: e.code,
          message: e.message,
          alertType: 'danger',
        })
      );
    }
    return throwError(e as {response: unknown});
  }
}

export async function put(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig | undefined
): Promise<unknown> {
  try {
    const res = await axios.put(url, data, config);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      dispatch(
        alertActions.setAlertMsg({
          code: e.code,
          message: e.message,
          alertType: 'danger',
        })
      );
    }
    return throwError(e as {response: unknown});
  }
}

export async function patch(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig | undefined
): Promise<unknown> {
  try {
    const res = await axios.patch(url, data, config);
    return res.data.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      dispatch(
        alertActions.setAlertMsg({
          code: e.code,
          message: e.message,
          alertType: 'danger',
        })
      );
    }
    return throwError(e as {response: unknown});
  }
}
