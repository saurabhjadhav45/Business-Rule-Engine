import Helmet from '@common/components/utils/Helmet';
import StorageHelper from '@core/helpers/storage-helpers/storage.helper';
import {dispatch} from '@store';
import Button from '@submodules/Button/Button';
import {useEffect} from 'react';

import {authActions} from '../auth/store/reducer';
import './index.scss';
import productApi from './api/index';

function Home() {
  useEffect(() => {
    productApi('GSTR').then((res) => {
      console.log('Product List', res.data);
    });
  }, []);
  const handleLogout = () => {
    StorageHelper.clear();
    dispatch(authActions.logout());
  };
  return (
    <>
      <Helmet title='Home' />
      <div className='home-container'>
        <h1>Home Page</h1>
        <Button onClick={handleLogout}>Click here to logout</Button>
      </div>
    </>
  );
}

export default Home;
