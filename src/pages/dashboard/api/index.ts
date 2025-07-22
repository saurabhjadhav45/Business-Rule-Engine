import {Api} from '@common/constants/index';
import {get} from '@core/services/httpMethods';
import {AxiosResponse} from 'axios';

const productApi = async (productType: string) => {
  const response = await get(
    `${Api.SUBSCRIPTION_BASE_URL}${Api.ACTIVE_INACTIVE_GSTINS}?`,
    {
      headers: {
        action: 'PRACTICE_MANAGE_CLIENT',
        productType,
      },
    }
  );
  return response as AxiosResponse;
};
export default productApi;
