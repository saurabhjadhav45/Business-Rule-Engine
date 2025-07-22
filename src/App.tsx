import {alertActions} from '@core/store/alertReducer';
import Alert from '@shared/components/alert';
import Loader from '@shared/components/loader/index';
import {RootState, dispatch} from '@store';
import {useSelector} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import AppRoutes from './routes';
import './App.scss';
import './utils/main.scss';

export default function App() {
  const {
    loader: {isAppLoading},
    alert: {message, isOpen, alertType, code},
  } = useSelector((state: RootState) => state);

  const alertContent = () => (
    <div>
      {code !== 'SUCCESS' ? (
        <span className='fw-7'>Error!&nbsp;:&nbsp;</span>
      ) : (
        <span className='fw-7'>Success!&nbsp;:&nbsp;</span>
      )}
      <span>{message}</span>
    </div>
  );

  if (isOpen) {
    setTimeout(() => {
      dispatch(alertActions.closeAlertMsg());
    }, 5000);
  }
  return (
    <>
      <div className='main-container'>
        <BrowserRouter>
          {/* <Header /> */}
          <AppRoutes />
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
      {isAppLoading && (
        <div className='app-loader'>
          <Loader />
        </div>
      )}
      {isOpen && (
        <Alert
          closeFn={() => {
            dispatch(alertActions.closeAlertMsg());
          }}
          variant='filled'
          position='top'
          showIcon={false}
          content={alertContent()}
          isCloseVisible
          toastType={alertType}
          id={alertType}
          dataTestId='test-toast'
        />
      )}
    </>
  );
}
