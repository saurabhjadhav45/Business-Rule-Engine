import {Api} from '@common/constants/index';
import {ILoginApiProps} from '@common/interfaces';
import {post} from '@core/services/httpMethods';
import {AxiosResponse} from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const loginApi = async (data: ILoginApiProps) => {
  const response = await post(`${Api.USERS_BASE_URL}${Api.LOGIN}`, {
    usrEmail: data.email,
    usrPwd: data.password,
    inviteUuid: '',
  });
  return response as AxiosResponse;
};
