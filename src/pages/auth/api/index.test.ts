import {Api} from '@common/constants';
import BASE_URL from '@core/helpers/constants';
import axios from '@core/services/axios';
import {AxiosResponse} from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {loginApi} from '.';

const mock = new MockAdapter(axios);

describe('Auth API Testing', () => {
  it('should match the mock response of LoginAPi', async () => {
    mock
      .onPost(`${BASE_URL}${Api.USERS_BASE_URL}${Api.LOGIN}`, {
        usrEmail: 'test@g.com',
        usrPwd: 'password1356',
        inviteUuid: '',
      })
      .reply(
        () =>
          new Promise((resolve) => {
            resolve([200, {message: 'api called'}]);
          })
      );
    const res: AxiosResponse = await loginApi({
      email: 'test@g.com',
      password: 'password1356',
    });
    expect(res).toEqual({message: 'api called'});
  });
});
